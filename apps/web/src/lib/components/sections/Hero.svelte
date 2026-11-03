<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';
  import Logo from '$lib/components/ui/Logo.svelte';
</script>

<section class="hero-section relative isolate overflow-hidden text-white">
  <div class="hero-orb" aria-hidden="true"></div>
  <div class="hero-light" aria-hidden="true"></div>

  <div class="container-x relative z-10 flex min-h-[680px] flex-col">
    <div class="hero-brand pt-7 md:pt-9">
      <Logo size="lg" />
    </div>

    <div class="hero-copy mt-auto max-w-[760px] pb-16 pt-24 md:pb-20 lg:pb-24">
      <Reveal>
        <p class="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.24em] text-white/65 md:text-xs">
          <span class="h-px w-9 bg-[#d93640]"></span>
          Elevate Media Productions
        </p>
      </Reveal>
      <Reveal>
        <h1 class="max-w-[760px] font-display text-[2.45rem] font-semibold leading-[1.08] tracking-[-.045em] text-white sm:text-5xl md:text-6xl lg:text-[4.15rem]">
          We craft digital experiences that <span class="text-[#e14b55]">elevate</span> brands.
        </h1>
      </Reveal>
      <Reveal>
        <p class="mt-6 max-w-[560px] text-base leading-7 text-white/70 md:text-lg">
          Elevate Media Productions builds web applications, mobile apps and community platforms that help organizations launch, grow and engage their audiences.
        </p>
      </Reveal>
      <Reveal>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a href="/portfolio" class="hero-button">Explore our work <span aria-hidden="true">→</span></a>
          <a href="/about" class="hero-text-link">Discover Elevate</a>
        </div>
      </Reveal>
    </div>
  </div>
</section>

<style>
  .hero-section {
    min-height: 680px;
    background:
      radial-gradient(ellipse at 52% 38%, rgba(73,67,81,.28), transparent 44%),
      linear-gradient(112deg, #201f29 0%, #1b1a23 56%, #17161f 100%);
  }
  .hero-orb {
    position: absolute;
    z-index: 0;
    pointer-events: none;
    width: min(72vw, 930px);
    aspect-ratio: 1;
    left: clamp(-260px, -13vw, -110px);
    top: clamp(-470px, -37vw, -250px);
    border-radius: 50%;
    transform: rotate(-17deg);
    background:
      radial-gradient(ellipse at 34% 28%, rgba(255,255,255,.11), transparent 20%),
      repeating-radial-gradient(ellipse at 39% 38%,
        #08090d 0 7px,
        #171820 8px 12px,
        #05060a 13px 19px,
        #282832 20px 22px,
        #090a0e 23px 30px);
    box-shadow:
      inset -45px -42px 90px rgba(0,0,0,.88),
      inset 16px 12px 35px rgba(255,255,255,.07),
      28px 42px 100px rgba(0,0,0,.55);
    -webkit-mask-image: radial-gradient(ellipse at 48% 48%, #000 52%, rgba(0,0,0,.96) 66%, transparent 76%);
    mask-image: radial-gradient(ellipse at 48% 48%, #000 52%, rgba(0,0,0,.96) 66%, transparent 76%);
  }
  .hero-orb::before {
    content: '';
    position: absolute;
    inset: 1%;
    border-radius: inherit;
    background: repeating-radial-gradient(ellipse at 39% 38%,
      transparent 0 18px,
      rgba(181,35,48,.82) 19px 20px,
      rgba(235,79,88,.25) 21px 22px,
      transparent 23px 34px);
    filter: drop-shadow(0 0 4px rgba(204,42,55,.42));
    -webkit-mask-image: radial-gradient(ellipse at 48% 48%, #000 38%, transparent 73%);
    mask-image: radial-gradient(ellipse at 48% 48%, #000 38%, transparent 73%);
  }
  .hero-orb::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(145deg, transparent 32%, rgba(221,51,64,.12) 48%, transparent 61%);
    mix-blend-mode: screen;
  }
  .hero-light {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(90deg, rgba(27,26,35,.08) 0%, rgba(27,26,35,.1) 34%, rgba(27,26,35,.72) 69%, rgba(27,26,35,.12) 100%),
      linear-gradient(0deg, #1b1a23 0%, transparent 29%);
  }
  .hero-button {
    display: inline-flex;
    align-items: center;
    gap: 18px;
    min-height: 46px;
    padding: 0 20px;
    color: white;
    background: #c92e39;
    font-size: 13px;
    font-weight: 600;
    transition: background .2s ease;
  }
  .hero-button:hover { background: #a9212c; }
  .hero-text-link {
    padding: 12px 5px;
    color: rgba(255,255,255,.78);
    font-size: 13px;
    font-weight: 500;
  }
  .hero-text-link:hover { color: white; }
  @media (min-width: 900px) {
    .hero-section { min-height: 740px; }
    .hero-copy { padding-bottom: 92px; }
    .hero-orb { width: min(68vw, 900px); left: -150px; top: -380px; }
    .hero-light {
      background:
        linear-gradient(90deg, rgba(27,26,35,.02) 0%, rgba(27,26,35,.08) 36%, rgba(27,26,35,.78) 74%, rgba(27,26,35,.16) 100%),
        linear-gradient(0deg, #1b1a23 0%, transparent 30%);
    }
  }
  @media (max-width: 699px) {
    .hero-section { min-height: 700px; }
    .hero-orb { width: 670px; left: -300px; top: -265px; opacity: .78; }
    .hero-light {
      background:
        linear-gradient(90deg, rgba(27,26,35,.24), rgba(27,26,35,.72) 76%),
        linear-gradient(0deg, #1b1a23 0%, transparent 42%);
    }
    .hero-brand :global(a) { transform: scale(.9); transform-origin: left top; }
    .hero-copy { padding-bottom: 72px; }
  }
</style>