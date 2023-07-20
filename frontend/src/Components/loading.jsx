import './Style/loading.css'

export default function Load({height, width})
{
    return(
        <div className="loader" style={{width: width, height: height}}></div>
    )
}