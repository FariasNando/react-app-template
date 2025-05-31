import React, { useState } from 'react'
import { useApolloClient } from 'react-apollo'

import TechnicalAssistanceForm from './components/TechnicalAssistanceForm'
import TechnicalAssistanceResult from './components/TechnicalAssistanceResult'
import ErrorMessage from './components/ErrorMessage'
import NoResultMessage from './components/NoResultMessage'
import GET_TECHNICAL_ASSISTENCE from './graphql/queries/GetTechnicalAssistence.gql'

const TechnicalAssistance: React.FC = () => {
  const client = useApolloClient()
  const [cep, setCep] = useState('')
  const [touched, setTouched] = useState(false)
  const [product] = useState('cooktop') // Troque conforme necessário
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<any>(null)
  const [showAll, setShowAll] = useState(false)

  const handleCheck = async (
    customCep?: string,
    customState?: string,
    customCity?: string
  ) => {
    const cepToCheck = customCep ?? cep
    const stateToCheck = customState
    const cityToCheck = customCity

    if (cepToCheck && cepToCheck.length === 8) {
      try {
        const { data } = await client.query({
          query: GET_TECHNICAL_ASSISTENCE,
          variables: { postalCode: Number(cepToCheck), product },
          fetchPolicy: 'network-only',
        })

        setResult(data)
        setError(null)
      } catch (err) {
        setError(err)
        setResult(null)
      }
    } else if (stateToCheck && cityToCheck) {
      try {
        const { data } = await client.query({
          query: GET_TECHNICAL_ASSISTENCE,
          variables: { product, uf: stateToCheck, city: cityToCheck },
          fetchPolicy: 'network-only',
        })

        setResult(data)
        setError(null)
      } catch (err) {
        setError(err)
        setResult(null)
      }
    } else {
      setTouched(true)
    }
  }

  const renderResult = () => {
    if (error) {
      return (
        <ErrorMessage message="Ocorreu um erro ao buscar a assistência técnica." />
      )
    }

    const assists = result?.getTechnicalAssistence?.data

    if (Array.isArray(assists) && assists.length === 0) {
      return <NoResultMessage />
    }

    if (Array.isArray(assists) && assists.length > 0) {
      const visibleAssists = showAll ? assists : assists.slice(0, 2)

      return (
        <>
          {visibleAssists.map((assist, idx) => (
            <TechnicalAssistanceResult key={idx} assist={assist} />
          ))}
          {assists.length > 2 && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              style={{ marginTop: 16 }}
            >
              {showAll ? 'Ver menos' : 'Ver mais'}
            </button>
          )}
        </>
      )
    }

    return null
  }

  return (
    <section>
      <TechnicalAssistanceForm
        onSubmit={handleCheck}
        touched={touched}
        cep={cep}
        setCep={setCep}
        setTouched={setTouched}
      />
      <div>{renderResult()}</div>
    </section>
  )
}

export default TechnicalAssistance
