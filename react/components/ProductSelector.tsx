import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { CSS_HANDLES } from '../style/theme'

interface ProductSelectorItem {
  image: string
  text: string
  value: string
}

interface ProductSelectorProps {
  items: ProductSelectorItem[]
  selected: string
  onSelect: (item: { value: string; text: string }) => void
}

const ProductSelector = ({
  items,
  selected,
  onSelect,
}: ProductSelectorProps) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={`flex flex-wrap justify-center .items-center ${handles.productSelectorContainer}`}
    >
      {items.map((item) => {
        const isSelected = selected === item.text

        return (
          <button
            key={item.text}
            type="button"
            className={`flex flex-column items-center bn pointer bg-white ${handles.productSelectorButton
              }${isSelected
                ? ` ${handles.productSelectorButtonSelected} b--blue bb bw2`
                : ''
              }`}
            onClick={() => onSelect({ value: item.value, text: item.text })}
            aria-pressed={isSelected}
          >
            <img
              src={item.image}
              alt={item.text}
              className={`${handles.product_image} h3 mb2`}
              width={55}
              height={55}
            />
            <span className={`${handles.product_text} fw f7 black`}>
              {item.text}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default ProductSelector
