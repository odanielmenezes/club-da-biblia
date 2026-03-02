# Club da Bíblia • Landing Page

Landing page cristã moderna, persuasiva e responsiva para o projeto Club da Bíblia.

## Stack

- Vite
- React
- Styled-components (100% da estilização)
- Framer Motion (animações suaves)

## Funcionalidades

- Hero premium com logo, ilustração da Bíblia e glow
- Contador dinâmico animado: dias, horas, minutos, segundos
- CTA principal com microinteração
- Seção de conversão com formulário validado
- Seção de camisetas com carrossel moderno e CTA
- Layout mobile-first e componentizado

## Estrutura

```bash
src/
	assets/
		bible-illustration.svg
		logo-club-da-biblia.svg
		tshirt-1.svg
		tshirt-2.svg
		tshirt-3.svg
	components/
		Button/
			component.tsx
			style.js
		Carousel/
			component.tsx
			style.js
		CheckItem/
			component.tsx
			style.js
		Container/
			component.tsx
			style.js
		CountdownCard/
			component.tsx
			style.js
		InfoBadge/
			component.tsx
			style.js
		InputField/
			component.tsx
			style.js
		SectionWrapper/
			component.tsx
			style.js
	sections/
		FormSection/
			component.tsx
			style.js
		HeroSection/
			component.tsx
			style.js
		MerchSection/
			component.tsx
			style.js
	styles/
		GlobalStyle.js
		Theme.js
	App.jsx
	main.jsx
	vite-env.d.ts
```

## Como rodar

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

## Deploy no GitHub Pages

1. Atualize o campo `homepage` no `package.json` com seu usuario do GitHub:

```json
"homepage": "https://SEU-USUARIO.github.io/club-da-biblia/"
```

2. Rode o deploy:

```bash
npm run deploy
```

3. No GitHub, em `Settings > Pages`, configure:

- `Source`: `Deploy from a branch`
- `Branch`: `gh-pages` (root)

4. Acesse:

```bash
https://SEU-USUARIO.github.io/club-da-biblia/
```
