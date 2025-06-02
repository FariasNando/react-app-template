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
  onSelect: (item: ProductSelectorItem) => void
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  items,
  selected,
  onSelect,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={`flex flex-wrap justify-center items-center ${handles.productSelectorContainer}`}
    >
      {items.map((item) => {
        const isSelected = selected === item.text

        return (
          <button
            key={item.value}
            type="button"
            className={`flex flex-column items-center bn pointer bg-white ${handles.productSelectorButton
              }${isSelected
                ? ` ${handles.productSelectorButtonSelected} b--blue bb bw2`
                : ''
              }`}
            onClick={() => onSelect(item)}
            aria-pressed={isSelected}
          >
            <img
              src={item.image}
              alt={item.text}
              className={`${handles.product_image} h3 mb2`}
              width={55}
              height={55}
              loading="lazy"
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

export default React.memo(ProductSelector)
