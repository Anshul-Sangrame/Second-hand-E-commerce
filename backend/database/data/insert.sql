INSERT INTO users (first_name, last_name, email, password, city, state, address, phone, DOB, cart_cost)
VALUES
   ('John', 'Doe', 'john.doe@example.com', 'password', 'New York', 'NY', '123 Main St, Apt 4B', '1234567890', '1985-07-15', 0),
   ('Jane', 'Smith', 'jane.smith@example.com', 'password', 'Los Angeles', 'CA', '456 Oak St, Apt 10C', '9876543210', '1990-03-22', 0),
   ('Michael', 'Johnson', 'michaelj@example.com', 'password', 'Chicago', 'IL', '789 Elm St, Apt 7D', '5551234567', '1988-12-01', 0),
   ('Sarah', 'Davis', 'sarah.davis@example.com', 'password', 'Miami', 'FL', '321 Pine Ave, Apt 2A', '4567890123', '1992-09-10', 0),
   ('Emily', 'Wilson', 'emily.wilson@example.com', 'password', 'San Francisco', 'CA', '567 Broadway St, Apt 5E', '9876543219', '1995-05-18', 0),
   ('David', 'Thompson', 'davidt@example.com', 'password', 'Seattle', 'WA', '789 Oak Lane, Apt 3C', '1234567891', '1991-11-30', 0),
   ('Olivia', 'Anderson', 'olivia.anderson@example.com', 'password', 'Austin', 'TX', '456 Maple Ave, Apt 8D', '9876543218', '1987-04-12', 0),
   ('William', 'Brown', 'william.brown@example.com', 'password', 'Boston', 'MA', '789 Elm St, Apt 2B', '5551234568', '1994-08-05', 0),
   ('Sophia', 'Lee', 'sophia.lee@example.com', 'password', 'Atlanta', 'GA', '123 Oak St, Apt 6C', '4567890124', '1989-02-25', 0),
   ('James', 'Smith', 'james.smith@example.com', 'password', 'Dallas', 'TX', '567 Pine Ave, Apt 9A', '9876543217', '1993-06-08', 0);

INSERT INTO products (title, description, tag, cost, image_url, qty, views, owner_id)
VALUES
   ('iPhone 12', 'Apple iPhone 12 with A14 Bionic chip', 'Electronics', 999, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVsj9hhQ37GLJ5GqwXFWhQQq8c-lewoGS16g&usqp=CAU', 100, 0, 1),
   ('Samsung Galaxy S21', 'Samsung Galaxy S21 with Exynos 2100 chip', 'Electronics', 899, 'https://www.91-cdn.com/hub/wp-content/uploads/2020/10/Samsung-Galaxy-S21-Ultra-3.jpg', 150, 0, 2),
   ('Nike Air Zoom Pegasus 38', 'Running shoes with responsive cushioning', 'Footwear', 129, 'https://cdn.fleetfeet.com/assets/2021_NIKE_PEGASUS_38_MENS_12.jpg/dynamic:1-aspect:1.9047619047619-fit:cover-strategy:entropy/2021_NIKE_PEGASUS_38_MENS_12--1200.jpg', 50, 0, 3),
   ('Sony WH-1000XM4', 'Wireless noise-canceling headphones', 'Electronics', 349, 'https://m.media-amazon.com/images/I/51cEIlw5HoL.jpg', 200, 0, 4),
   ('Nintendo Switch', 'Hybrid gaming console by Nintendo', 'Gaming', 299, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTySHzhj4XkTin3rEoqkCthkd0Kso7IxVmiMg&usqp=CAU', 80, 0, 5),
   ('Canon EOS Rebel T7i', '24.2MP DSLR camera with 18-55mm lens', 'Electronics', 749, 'https://www.sagmart.com/includes/functions/image.php?width=300&height=300&image=http://www.sagmart.com/uploads/2017/02/20/product_2/canon-eos-rebel-t7i-specifications_2.jpg', 30, 0, 6),
   ('Apple Watch Series 6', 'Advanced smartwatch with ECG and blood oxygen monitoring', 'Electronics', 399, 'https://photos5.appleinsider.com/gallery/37776-71212-Product-RED-Apple-Watch-Series-6-Blood-Oxygen-App-xl.jpg', 120, 0, 7),
   ('Adidas Ultraboost 21', 'Running shoes with Boost cushioning technology', 'Footwear', 180, 'https://m.media-amazon.com/images/I/7185p-qJnaL._AC_UY1000_.jpg', 100, 0, 8),
   ('Dyson V11 Absolute', 'Cordless stick vacuum cleaner with powerful suction', 'Home', 599, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZj_l8OXsfL5V5bj5BIFloDn8qbIR4jTtvUw&usqp=CAU', 50, 0, 9),
   ('Sony PlayStation 5', 'Next-generation gaming console by Sony', 'Gaming', 499, 'https://5.imimg.com/data5/SELLER/Default/2022/2/KZ/UE/IS/146215056/sony-playstation-5-ps5-console-disc-version-1-year-warranty-by-sony-500x500-1--500x500.jpeg', 60, 0, 10);

INSERT INTO views (user_id, product_id)
VALUES
   (1, 3),
   (2, 5),
   (3, 1),
   (4, 2),
   (5, 6),
   (6, 9),
   (7, 4),
   (8, 7),
   (9, 10),
   (10, 8);

INSERT INTO carts (user_id, product_id, qty)
VALUES
   (1, 3, 2),
   (2, 5, 1),
   (3, 1, 3),
   (4, 2, 1),
   (5, 6, 2),
   (6, 9, 1),
   (7, 4, 2),
   (8, 7, 1),
   (9, 10, 2),
   (10, 8, 1);
