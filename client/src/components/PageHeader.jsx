import Reveal from './Reveal';

export default function PageHeader({ title, subtitle }) {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-primary-600 via-primary-500 to-care-600 text-white text-center px-4">
      <Reveal>
        <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
        {subtitle && <p className="mt-3 text-white/90 max-w-2xl mx-auto">{subtitle}</p>}
      </Reveal>
    </section>
  );
}