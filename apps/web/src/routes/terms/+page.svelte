<script lang="ts">
  import LegalPage from '$lib/components/layout/LegalPage.svelte';
  import { termsSections } from '$lib/data/legal';
</script>

<svelte:head>
  <title>Terms of Service — Elevate Media Productions</title>
  <meta name="description" content="The terms governing your use of Elevate Media Productions' website and services." />
</svelte:head>

<LegalPage
  badge="Legal"
  title="Terms of Service"
  subtitle="The rules and conditions for using our website and services."
  sections={termsSections}
/>