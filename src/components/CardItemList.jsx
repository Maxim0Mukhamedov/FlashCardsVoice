import React from "react";
import { useSpatnavInitialization, useSection } from '@salutejs/spatial';
import { CardItem } from "./CardItem"
import "../App.css";


export const CardItemList = (props) => {
  const { items, delCard} = props
  return (
    <ul className="notes">
      {
        items.map((item, index) => (
          <CardItem
            item   = { item }
            index  = { index }
            delCard = { () => delCard(item) }
          />
        ))
      }
    </ul>
  )
}


