import { Container, GradientButton } from "../components/ui";
import { ArrowRight } from "../components/Icons";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-24">
      <span className="font-display text-[7rem] font-bold leading-none text-gold/30 sm:text-[10rem]">
        404
      </span>
      <h1 className="mt-2 font-display text-3xl font-bold text-charcoal sm:text-4xl">
        This page does not exist
      </h1>
      <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-neutral-400">
        The link may be out of date, or the page may have moved. Everything on the site is reachable
        from the home page.
      </p>
      <div className="mt-8">
        <GradientButton to="/">
          Back to the home page <ArrowRight />
        </GradientButton>
      </div>
    </Container>
  );
}
