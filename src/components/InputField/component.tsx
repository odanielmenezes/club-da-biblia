import { FieldWrap, Helper, Input, Label } from './style'

type InputFieldProps = Readonly<{
  id: string
  label: string
  error?: string
  helperText?: string
  [key: string]: any
}>

function InputField({ id, label, error, helperText, ...rest }: InputFieldProps) {
  return (
    <FieldWrap>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} data-error={Boolean(error)} {...rest} />
      <Helper data-error={Boolean(error)}>{error || helperText || ' '}</Helper>
    </FieldWrap>
  )
}

export default InputField
