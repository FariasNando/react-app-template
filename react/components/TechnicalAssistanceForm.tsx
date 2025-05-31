import React, { useState, useEffect } from 'react'

import { fetchStates, fetchCities } from '../utils'
import CepInput from './CepInput'
import StateCityInput from './StateCityInput'

interface TechnicalAssistanceFormProps {
  onSubmit: (cep: string, state?: string, city?: string) => void
  touched: boolean
  cep: string
  setCep: (cep: string) => void
  setTouched: (t: boolean) => void
}

const TechnicalAssistanceForm: React.FC<TechnicalAssistanceFormProps> = ({
  onSubmit,
  touched,
  cep,
  setCep,
  setTouched,
}) => {
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [cities, setCities] = useState<string[]>([])
  const [states, setStates] = useState<string[]>([])

  // Busca estados do IBGE
  useEffect(() => {
    fetchStates().then(setStates)
  }, [])

  // Busca cidades do IBGE ao selecionar estado
  useEffect(() => {
    if (state) {
      fetchCities(state).then(setCities)
    } else {
      setCities([])
      setCity('')
    }
  }, [state])

  const handleChangeCep = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value)
    setTouched(true)
  }

  const handleSubmitCep = (e: React.FormEvent) => {
    e.preventDefault()
    if (cep.length === 8) {
      onSubmit(cep)
    } else {
      setTouched(true)
    }
  }

  const handleSubmitCity = (e: React.FormEvent) => {
    e.preventDefault()
    if (state && city) {
      onSubmit('', state, city)
    } else {
      setTouched(true)
    }
  }

  return (
    <form
      itemScope
      itemType="https://schema.org/SearchAction"
      aria-label="Buscar assistência técnica pelo CEP ou Estado/Cidade"
    >
      <div className="flex flex-column items-center flex-wrap gap-4">
        <CepInput
          cep={cep}
          onChange={handleChangeCep}
          onSubmit={handleSubmitCep}
        />
        <span className="fw6">OU</span>
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
      {touched && cep.length !== 8 && (!state || !city) && (
        <span role="alert" className="red db mt3">
          Digite um CEP válido (8 dígitos) ou selecione Estado e Cidade
        </span>
      )}
    </form>
  )
}

export default TechnicalAssistanceForm
