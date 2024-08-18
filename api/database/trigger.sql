CREATE OR REPLACE FUNCTION total_cart_items() RETURNS trigger AS $total_cart_items$
DECLARE 
total_items int;

BEGIN
    select count(*) into total_items from carts where carts.user_id = NEW.user_id;
    IF(total_items=5) THEN
        rollback;
    ELSIF (total_items<5) THEN
       return NEW;
    END IF;

END;
$total_cart_items$ LANGUAGE plpgsql; 

CREATE OR REPLACE TRIGGER total_cart_items 
BEFORE INSERT ON carts
FOR EACH ROW EXECUTE FUNCTION total_cart_items();

CREATE OR REPLACE FUNCTION  cart_addition() RETURNS trigger AS $cart_addition$
DECLARE
qty_product int;

BEGIN
    select products.qty into qty_product from products where products.id=NEW.product_id;
    IF (qty_product-NEW.qty<0) THEN
        rollback;
    ELSE 
        update products 
        set qty=qty-NEW.qty where id=new.product_id;
        return NEW;
    END IF;
END;
$cart_addition$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER cart_addition 
BEFORE INSERT ON carts
FOR EACH ROW EXECUTE FUNCTION cart_addition();

