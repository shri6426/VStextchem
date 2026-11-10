import { ButtonLink } from '../components/ui'
import { useSeo } from '../hooks/useSeo'

export default function NotFoundPage({ message }: { message?: string }) {
  useSeo({ title: 'Page not found', description: 'The page you are looking for could not be found.', noindex: true })
  return (
    <section className="bg-grid border-b border-line py-28">
      <div className="container-site max-w-2xl text-center">
        <p className="code text-sm font-bold text-accent">404</p>
        <h1 className="mt-4 text-4xl font-extrabold">Page not found</h1>
        <p className="mt-4 text-muted">{message ?? 'The page you’re looking for doesn’t exist or has moved.'}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to="/products" arrow>
            Browse products
          </ButtonLink>
          <ButtonLink to="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
