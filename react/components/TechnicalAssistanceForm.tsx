import React, { useState, useEffect } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { fetchStates, fetchCities } from '../utils'
import CepInput from './CepInput'
import StateCityInput from './StateCityInput'
import { CSS_HANDLES } from '../style/theme'

interface TechnicalAssistanceFormSubmit {
  cep: string
  state?: string
  city?: string
  product?: string
}

interface TechnicalAssistanceFormProps {
  onSubmit: (params: TechnicalAssistanceFormSubmit) => void
  cep: string
  setCep: (cep: string) => void
  product: string
}

const TechnicalAssistanceForm: React.FC<TechnicalAssistanceFormProps> = ({
  onSubmit,
  cep,
  setCep,
  product,
}) => {
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [cities, setCities] = useState<string[]>([])
  const [states, setStates] = useState<string[]>([])
  const [showError, setShowError] = useState(false)
  const { handles } = useCssHandles(CSS_HANDLES)

  useEffect(() => {
    fetchStates().then(setStates)
  }, [])

  useEffect(() => {
    if (state) {
      fetchCities(state).then(setCities)
    } else {
      setCities([])
      setCity('')
    }
  }, [state])

  const handleChangeCep = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCep(e.target.value)
    },
    [setCep]
  )

  const handleSubmitCep = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const cleanCep = cep.replace(/\D/g, '')

      if (cleanCep.length === 8) {
        onSubmit({ cep: cleanCep, product })
        setShowError(false)
      } else {
        setShowError(true)
      }
    },
    [cep, onSubmit, product]
  )

  const handleSubmitCity = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (state && city) {
        onSubmit({ cep: '', state, city, product })
        setShowError(false)
      } else {
        setShowError(true)
      }
    },
    [state, city, onSubmit, product]
  )

  return (
    <form
      itemScope
      itemType="https://schema.org/SearchAction"
      aria-label="Buscar assistência técnica pelo CEP ou Estado/Cidade"
      className={`${handles.form} w-100 ph6`}
      autoComplete="off"
    >
      <div className="flex flex-column items-center flex-wrap">
        <div className="w-100 mb4">
          <CepInput
            cep={cep}
            onChange={handleChangeCep}
            onSubmit={handleSubmitCep}
          />
          <span className="flex justify-center">OU</span>
          <StateCityInput
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
            states={states}
            cities={cities}
            onSubmit={handleSubmitCity}
          />
        </div>
        {showError && !(cep.length === 8 || (state && city)) && (
          <span role="alert" className="red db mt3">
            Digite um CEP válido (8 dígitos) ou selecione Estado e Cidade
          </span>
        )}
      </div>
    </form>
  )
}

export default TechnicalAssistanceForm
