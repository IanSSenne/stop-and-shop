import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Elevation } from "@blueprintjs/core";

function SellingItems(item) {
return (
    <>
    <Card>
        <h1>{item.title}</h1>
        <div>
            {/* {item.photos[0]} */}
        </div>
    </Card>
    <Card>

    </Card>
    </>
)


}

export default SellingItems;