import { motion } from 'framer-motion'
import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import Button from '../../components/Button/component'
import CheckItem from '../../components/CheckItem/component'
import Container from '../../components/Container/component'
import InputField from '../../components/InputField/component'
import SectionWrapper from '../../components/SectionWrapper/component'
import {
  CheckList,
  Description,
  Feedback,
  Grid,
  Heading,
  LeftCard,
  RightCard,
  SuccessActions,
  SuccessBody,
  SuccessCard,
  SuccessTitle,
} from './style.js'

const initialValues = {
  name: '',
  whatsapp: '',
  email: '',
}

function FormSection() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState(initialValues)
  const [feedback, setFeedback] = useState({ text: '', error: false })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim()
  const leadsEndpoint = `${apiBaseUrl}/api/leads`
  const whatsappCommunityUrl =
    (import.meta.env.VITE_WHATSAPP_COMMUNITY_URL || '').trim() ||
    'https://wa.me/?text=Quero%20fazer%20parte%20da%20comunidade%20Club%20da%20Biblia'

  const isValid = useMemo(() => {
    return (
      values.name.trim().length > 2 &&
      /^\d{10,13}$/.test(values.whatsapp.replaceAll(/\D/g, '')) &&
      /\S+@\S+\.\S+/.test(values.email)
    )
  }, [values])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = { ...initialValues }

    if (values.name.trim().length < 3) {
      nextErrors.name = 'Informe seu nome completo.'
    }

    if (!/^\d{10,13}$/.test(values.whatsapp.replaceAll(/\D/g, ''))) {
      nextErrors.whatsapp = 'Digite um WhatsApp válido com DDD.'
    }

    if (!/\S+@\S+\.\S+/.test(values.email)) {
      nextErrors.email = 'Informe um e-mail válido.'
    }

    setErrors(nextErrors)
    return Object.values(nextErrors).every((item) => !item)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return

    if (!validate()) {
      setFeedback({ text: 'Revise os campos destacados para prosseguir.', error: true })
      return
    }

    setIsSubmitting(true)
    setFeedback({ text: 'Enviando seu cadastro...', error: false })

    try {
      const payload = {
        name: values.name,
        whatsapp: values.whatsapp,
        email: values.email,
        source: 'landing-page',
        createdAt: new Date().toISOString(),
      }

      const response = await fetch(leadsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Falha ao salvar cadastro')
      }

      setIsSubmitted(true)
      setFeedback({
        text: 'Obrigado por se cadastrar! Seu contato foi salvo com sucesso.',
        error: false,
      })
      setValues(initialValues)
      setErrors(initialValues)
    } catch (error) {
      console.error('Erro ao enviar cadastro para webhook:', error)
      setFeedback({
        text: 'Nao foi possivel enviar agora. Tente novamente em instantes.',
        error: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const helperText = feedback.text || (!isValid && !isSubmitted ? 'Preencha os dados para concluir o cadastro.' : '')
  let helperState = 'idle'
  if (feedback.text) {
    if (feedback.error) {
      helperState = 'error'
    } else if (isSubmitting) {
      helperState = 'loading'
    } else {
      helperState = 'success'
    }
  } else if (!isValid && !isSubmitted) {
    helperState = 'error'
  }

  return (
    <SectionWrapper id="comunidade">
      <Container>
        <Grid
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <LeftCard
            as={motion.div}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <Heading>Faça parte desta mesa de comunhão</Heading>
            <Description>
              Ao se registrar, você entra para nossa comunidade exclusiva no WhatsApp e recebe os
              materiais de apoio para sua leitura diária.
            </Description>

            <CheckList>
              <CheckItem title="Acesso gratuito" description="O Evangelho é para todos." />
              <CheckItem
                title="Materiais de estudo"
                description="Cronograma e reflexões digitais para fortalecer sua constância com a Palavra."
              />
            </CheckList>
          </LeftCard>

          <RightCard
            as={motion.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.14 }}
          >
            {!isSubmitted && (
              <>
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.32, delay: 0.2 }}>
                  <InputField
                    id="name"
                    name="name"
                    label="Nome"
                    placeholder="Seu nome"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.32, delay: 0.26 }}>
                  <InputField
                    id="whatsapp"
                    name="whatsapp"
                    label="WhatsApp"
                    placeholder="(11) 90000-0000"
                    value={values.whatsapp}
                    onChange={handleChange}
                    error={errors.whatsapp}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.32, delay: 0.32 }}>
                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="voce@email.com"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.32, delay: 0.38 }}>
                  <Button type="submit" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Quero fazer parte'}
                  </Button>
                </motion.div>
              </>
            )}

            {isSubmitted && (
              <SuccessCard
                as={motion.div}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <SuccessTitle>Cadastro confirmado!</SuccessTitle>
                <SuccessBody>
                  Obrigado por caminhar com a gente. Toque no botao abaixo para entrar na comunidade
                  oficial do Club da Biblia no WhatsApp.
                </SuccessBody>
                <SuccessActions>
                  <Button
                    type="button"
                    fullWidth
                    onClick={() => window.open(whatsappCommunityUrl, '_blank', 'noopener,noreferrer')}
                  >
                    Entrar na comunidade no WhatsApp
                  </Button>
                </SuccessActions>
              </SuccessCard>
            )}

            <Feedback data-state={helperState}>{helperText}</Feedback>
          </RightCard>
        </Grid>
      </Container>
    </SectionWrapper>
  )
}

export default FormSection
