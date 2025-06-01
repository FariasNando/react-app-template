import React, { useState } from 'react'
import { useApolloClient } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'

import TechnicalAssistanceForm from './components/TechnicalAssistanceForm'
import TechnicalAssistanceResult from './components/TechnicalAssistanceResult'
import ErrorMessage from './components/ErrorMessage'
import NoResultMessage from './components/NoResultMessage'
import TechnicalAssistanceSkeleton from './components/skeleton/TechnicalAssistanceSkeleton'
import ProductSelector from './components/ProductSelector'
import { CSS_HANDLES } from './style/theme'
import GET_TECHNICAL_ASSISTENCE from './graphql/queries/GetTechnicalAssistence.gql'

interface TechnicalAssistanceSiteEditorProps {
  items?: Array<{ image: string; text: string; value: string }>
}

const TechnicalAssistance: React.FC<TechnicalAssistanceSiteEditorProps> = ({
  items,
}) => {
  const client = useApolloClient()
  const [cep, setCep] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(
    items?.[0]?.value ?? ''
  )

  const [showForm, setShowForm] = useState(false)

  const [result, setResult] = useState<{
    getTechnicalAssistence?: { data: TechnicalAssistanceResultType[] }
  } | null>(null)

  const [error, setError] = useState<unknown>(null)
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(false)
  const { handles } = useCssHandles(CSS_HANDLES)

  const handleCheck = async ({
    customCep,
    customState,
    customCity,
    customProduct,
  }: {
    customCep?: string
    customState?: string
    customCity?: string
    customProduct?: string
  }) => {
    setLoading(true)
    const cepToCheck = customCep ?? cep
    const stateToCheck = customState
    const cityToCheck = customCity
    const productToCheck = customProduct ?? 'cooktop'

    if (cepToCheck && cepToCheck.length === 8) {
      try {
        const { data } = await client.query({
          query: GET_TECHNICAL_ASSISTENCE,
          variables: {
            postalCode: Number(cepToCheck),
            product: productToCheck,
          },
          fetchPolicy: 'network-only',
        })

        setResult(data)
        setError(null)
      } catch (err) {
        setError(err)
        setResult(null)
      } finally {
        setLoading(false)
      }
    } else if (stateToCheck && cityToCheck) {
      try {
        const { data } = await client.query({
          query: GET_TECHNICAL_ASSISTENCE,
          variables: {
            product: productToCheck,
            uf: stateToCheck,
            city: cityToCheck,
          },
          fetchPolicy: 'network-only',
        })

        setResult(data)
        setError(null)
      } catch (err) {
        setError(err)
        setResult(null)
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  const renderResult = () => {
    if (loading) {
      return <TechnicalAssistanceSkeleton />
    }

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
        <div className="ph6">
          {visibleAssists.map((assist, idx) => (
            <TechnicalAssistanceResult key={idx} assist={assist} />
          ))}
          {assists.length > 2 && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="mt3 pv2 ph4 br2 bg-blue white b pointer bn"
            >
              {showAll ? 'Ver menos' : 'Ver mais'}
            </button>
          )}
        </div>
      )
    }

    return null
  }

  return (
    <section className="flex flex-column items-center">
      <ProductSelector
        items={items ?? []}
        selected={selectedProduct}
        onSelect={(value) => {
          setSelectedProduct(value)
          setShowForm(true)
        }}
      />
      {showForm && (
        <>
          <div className={`${handles.form_title} mb4 ph6`}>
            <span className="f5 fw5 db mb2 tc">
              Encontre uma assistência técnica autorizada Franke para:
            </span>
            {selectedProduct && (
              <span
                className={`${handles.selectedProductText} f5 fw6 db mv7 mh0 tc ttu`}
              >
                {selectedProduct}
              </span>
            )}
          </div>
          <TechnicalAssistanceForm
            onSubmit={({ cep: formCep, state, city, product }) =>
              handleCheck({
                customCep: formCep,
                customState: state,
                customCity: city,
                customProduct: product,
              })
            }
            cep={cep}
            setCep={setCep}
            product={selectedProduct}
          />
        </>
      )}
      <div>{renderResult()}</div>
    </section>
  )
}

// Tipagem para os dados de assistência técnica
interface TechnicalAssistanceResultType {
  nomeAssistencia?: string
  endereco?: string
  bairro?: string
  cidade?: string
  uf?: string
  cep?: string
  firstPhone?: string
  secondPhone?: string
  email?: string
  razaoSocial?: string
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
TechnicalAssistance.schema = {
  title: 'Assistência Técnica',
  description: 'Bloco principal de assistência técnica com seleção de produto',
  type: 'object',
  properties: {
    items: {
      type: 'array',
      title: 'Produtos',
      items: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
            title: 'URL da imagem',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          text: {
            type: 'string',
            title: 'Texto',
          },
        },
      },
      minItems: 1,
    },
  },
}

export default TechnicalAssistance
