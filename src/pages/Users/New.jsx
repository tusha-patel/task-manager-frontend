import React, { useState } from 'react'

const New = () => {
    const [data, setData] = useState(1);
    console.log(data, setData);

    return (
        <div>New</div>
    )
}

export default New