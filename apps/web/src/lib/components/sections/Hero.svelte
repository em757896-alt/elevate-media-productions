<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import CountUp from '$lib/components/ui/CountUp.svelte';

  const counters = [
    { value: 5, suffix: '+', label: 'Products shipped' },
    { value: 22, suffix: '', label: 'Technologies mastered' },
    { value: 100, suffix: '%', label: 'Client satisfaction' }
  ];
</script>

<section class="hero-section relative isolate overflow-hidden bg-[#1b1b22] pb-20 pt-28 text-white md:pt-32 lg:pb-24">
  <div class="hero-grid pointer-events-none absolute inset-0 opacity-40"></div>
  <div class="hero-ribbon" aria-hidden="true"></div>
  <div class="hero-shade pointer-events-none absolute inset-0" aria-hidden="true"></div>

  <div class="container-x relative z-10">
    <div class="max-w-[760px]">
      <Reveal>
        <div class="mb-8 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/55 sm:text-xs">
          <span class="h-px w-8 bg-primary-500"></span>
          Launching our community platform
        </div>
      </Reveal>
      <Reveal>
        <h1 class="max-w-[760px] font-display text-[2.55rem] font-semibold leading-[1.08] tracking-[-.045em] text-white sm:text-5xl md:text-6xl lg:text-[4.35rem]">
          We craft digital<br class="hidden sm:block" />
          experiences that<br class="hidden sm:block" />
          <span class="text-primary-400 italic">elevate</span> brands.
        </h1>
      </Reveal>
      <Reveal>
        <p class="mt-6 max-w-xl text-base leading-7 text-white/65 md:text-lg">
          Elevate Media Productions builds web applications, mobile apps and community platforms that help organizations <span class="font-medium text-white">launch, grow and engage their audiences</span>.
        </p>
      </Reveal>
      <Reveal>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="/portfolio" class="btn-gradient min-w-44 !rounded-sm !px-6 !py-3.5 text-sm">
            See our work
          </a>
          <a href="/about" class="btn-outline min-w-40 !rounded-sm !px-6 !py-3.5 text-sm">
            Learn more
          </a>
        </div>
      </Reveal>
    </div>

    <Reveal>
      <div class="mt-20 grid max-w-3xl grid-cols-1 border-t border-white/15 pt-7 sm:grid-cols-3 sm:gap-8">
        {#each counters as counter}
          <div class="py-2">
            <CountUp value={counter.value} suffix={counter.suffix} label={counter.label} />
          </div>
        {/each}
      </div>
    </Reveal>
  </div>
</section>

<style>
  .hero-section { min-height: 690px; }
  .hero-grid {
    background-image: linear-gradient(to right, rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.035) 1px, transparent 1px);
    background-size: 74px 74px;
    mask-image: linear-gradient(to bottom, black, transparent 90%);
  }
  .hero-ribbon {
    position: absolute; z-index: 0; pointer-events: none;
    width: clamp(430px, 64vw, 850px); aspect-ratio: 1;
    left: clamp(190px, 36vw, 520px); top: -32%;
    border-radius: 50%;
    transform: rotate(-18deg);
    background:
      radial-gradient(ellipse at 36% 34%, rgba(255,255,255,.15), transparent 22%),
      repeating-radial-gradient(ellipse at 38% 38%, #08090d 0 9px, #24242c 10px 12px, #0b0c11 13px 20px),
      radial-gradient(ellipse at 40% 38%, #34343c, #090a0e 68%);
    box-shadow: inset -34px -28px 65px rgba(0,0,0,.8), inset 12px 8px 28px rgba(255,255,255,.07), 0 35px 100px rgba(0,0,0,.55);
    opacity: .96;
    -webkit-mask-image: radial-gradient(ellipse at 48% 48%, #000 48%, rgba(0,0,0,.92) 61%, transparent 72%);
    mask-image: radial-gradient(ellipse at 48% 48%, #000 48%, rgba(0,0,0,.92) 61%, transparent 72%);
  }
  .hero-ribbon::before {
    content: ''; position: absolute; inset: 2%; border-radius: inherit;
    background: repeating-radial-gradient(ellipse at 38% 38%, transparent 0 18px, rgba(191,39,51,.82) 19px 20px, rgba(255,104,112,.16) 21px 22px, transparent 23px 34px);
    filter: drop-shadow(0 0 5px rgba(205,42,54,.45));
    -webkit-mask-image: radial-gradient(ellipse at 46% 46%, #000 35%, transparent 70%);
    mask-image: radial-gradient(ellipse at 46% 46%, #000 35%, transparent 70%);
  }
  .hero-ribbon::after {
    content: ''; position: absolute; inset: 0; border-radius: inherit;
    background: linear-gradient(135deg, transparent 35%, rgba(217,54,64,.12) 48%, transparent 58%);
    mix-blend-mode: screen;
  }
  .hero-shade {
    background: linear-gradient(90deg, #1b1b22 0%, rgba(27,27,34,.96) 25%, rgba(27,27,34,.65) 55%, rgba(27,27,34,.18) 100%), linear-gradient(0deg, #1b1b22 0%, transparent 35%);
  }
  @media (max-width: 700px) {
    .hero-section { min-height: 690px; }
    .hero-ribbon { width: 560px; left: 25%; top: -12%; opacity: .56; }
    .hero-shade { background: linear-gradient(90deg, rgba(27,27,34,.97), rgba(27,27,34,.76)), linear-gradient(0deg, #1b1b22 0%, transparent 50%); }
  }
</style>