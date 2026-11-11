<script lang="ts">
  import Reveal from '$lib/components/ui/Reveal.svelte';

  const challenges = [
    { id: 'operations', label: 'Work is scattered', problem: 'Teams rely on disconnected spreadsheets, messages and paper records.', response: 'A shared operations platform with role-based workflows, clear ownership and a reliable activity trail.', fit: 'Operations & management systems', next: 'A clearer view of what is happening, who is responsible and what needs attention.' },
    { id: 'learning', label: 'Learning feels passive', problem: 'People finish content without building confidence or proving what they can do.', response: 'Practical learning paths, project-based assessments, progress evidence and peer feedback.', fit: 'Practical learning experiences', next: 'Skills people can demonstrate, not just courses they can complete.' },
    { id: 'compliance', label: 'Compliance is confusing', problem: 'Requirements, evidence and deadlines are difficult to understand and keep together.', response: 'Guided assessments, plain-language explanations, evidence tracking and timely action lists.', fit: 'Civic & compliance tools', next: 'A more understandable route from requirements to documented action.' },
    { id: 'customer', label: 'Customers get lost', problem: 'People struggle to find the right information, service or next step.', response: 'A focused digital journey with clear content, accessible interfaces and useful self-service.', fit: 'Websites & customer portals', next: 'Less friction for visitors and fewer avoidable support questions.' }
  ];

  let selected = $state(challenges[0]);
</script>

<section class="section-padding bg-fog dark:bg-night" id="impact-finder">
  <div class="container-x">
    <Reveal>
      <div class="grid gap-8 border-b border-ink/20 pb-9 dark:border-white/15 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <p class="text-[11px] font-bold uppercase tracking-[.22em] text-primary-700 dark:text-primary-300">A different starting point / Impact finder</p>
        <div>
          <h2 class="font-display text-4xl font-semibold leading-[1.02] tracking-[-.055em] text-ink dark:text-white sm:text-6xl">Start with the problem.<br/>Build the right thing.</h2>
          <p class="mt-5 max-w-2xl text-base leading-7 text-ink-light dark:text-slate-400">Not every challenge needs an app. Choose what is getting in the way and see the kind of digital intervention worth exploring.</p>
        </div>
      </div>
    </Reveal>
    <div class="mt-9 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
      <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label="Choose a challenge">
        {#each challenges as challenge, i (challenge.id)}
          <button type="button" aria-pressed={selected.id === challenge.id} onclick={() => selected = challenge} class="flex items-center justify-between gap-4 border p-5 text-left transition-all {selected.id === challenge.id ? 'border-primary-700 bg-[#191d17] text-white dark:border-primary-300 dark:bg-[#272b22]' : 'border-ink/15 bg-white/50 text-ink hover:border-primary-600 dark:border-white/15 dark:bg-white/[.03] dark:text-white'}">
            <span><span class="mb-2 block text-[10px] font-bold uppercase tracking-[.18em] opacity-60">0{i + 1}</span><span class="font-display text-lg font-semibold">{challenge.label}</span></span>
            <span aria-hidden="true" class="text-xl">↗</span>
          </button>
        {/each}
      </div>
      <div class="border border-ink/15 bg-[#e9e9df] p-7 dark:border-white/15 dark:bg-[#191d17] md:p-10" aria-live="polite">
        <p class="text-[10px] font-bold uppercase tracking-[.2em] text-primary-700 dark:text-primary-300">The challenge</p>
        <h3 class="mt-3 font-display text-2xl font-semibold tracking-tight text-ink dark:text-white">{selected.label}</h3>
        <p class="mt-2 max-w-xl text-sm leading-6 text-ink-light dark:text-slate-400">{selected.problem}</p>
        <div class="my-7 h-px bg-ink/15 dark:bg-white/15"></div>
        <p class="text-[10px] font-bold uppercase tracking-[.2em] text-primary-700 dark:text-primary-300">A useful intervention</p>
        <p class="mt-3 max-w-xl text-base leading-7 text-ink dark:text-slate-200">{selected.response}</p>
        <div class="mt-7 grid gap-5 border-t border-ink/15 pt-6 dark:border-white/15 sm:grid-cols-2">
          <div><p class="text-[10px] font-bold uppercase tracking-[.16em] text-ink-light dark:text-slate-500">Potential product direction</p><p class="mt-2 text-sm font-semibold text-ink dark:text-white">{selected.fit}</p></div>
          <div><p class="text-[10px] font-bold uppercase tracking-[.16em] text-ink-light dark:text-slate-500">What better looks like</p><p class="mt-2 text-sm leading-6 text-ink-light dark:text-slate-300">{selected.next}</p></div>
        </div>
        <a href="/contact" class="mt-8 inline-flex items-center gap-3 border-b border-primary-700 pb-2 text-xs font-bold uppercase tracking-[.14em] text-ink hover:text-primary-700 dark:border-primary-300 dark:text-white dark:hover:text-primary-300">Talk through a challenge <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</section>
