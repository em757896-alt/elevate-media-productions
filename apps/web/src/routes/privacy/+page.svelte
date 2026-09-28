<script lang="ts">
  import LegalPage from '$lib/components/layout/LegalPage.svelte';
  import { privacySections } from '$lib/data/legal';
</script>

<svelte:head>
  <title>Privacy Policy — Elevate Media Productions</title>
  <meta name="description" content="How Elevate Media Productions collects, uses and protects your personal data, in line with the Kenya Data Protection Act and GDPR." />
</svelte:head>

<LegalPage
  badge="Legal"
  title="Privacy Policy"
  subtitle="How we collect, use and protect your personal data."
  sections={privacySections}
/>