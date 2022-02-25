<script>
  import Config from "$lib/SveltePress/sveltePress.config";

  import {
    Button,
    ClickableTile,
    Grid,
    Row,
    Column,
  } from "carbon-components-svelte";
  import ArrowRight32 from "carbon-icons-svelte/lib/ArrowRight32";

  import { session } from "$app/stores";

  $: nav = Config.nav.overwrite
    ? Config.nav.items || []
    : $session.get("navbar").concat(Config.nav.items || []);

  const breakpoints = {
    sm: 8,
  };
</script>

<svelte:head>
  <meta name="og:title" content={Config.title} />
  <title>{Config.title}</title>
</svelte:head>

<div class="sp--header">
  <Grid padding class="sp--grid">
    <Row>
      <Column style="text-align: center;">
        <h1 style="margin-top: 1rem">Ultimate GTK4 Crystal Guide</h1>
        <h2 class="subTitle">
          Learn how to create premium GTK4 apps in Crystal
        </h2>
        <Button
          icon={ArrowRight32}
          size="lg"
          href={nav.length > 0 ? nav[0].link : $session.get("navbar")[0]?.link}
          style="margin-top: 3rem">Let's get started</Button
        >
      </Column>
    </Row>
  </Grid>
  <Grid padding>
    <Row class="sp--header--tiles">
      <Column md sm={breakpoints.sm}>
        <ClickableTile href="/guide.pdf" class="sp--tile" rel="external">
          <h2 class="tile--title">Download as PDF</h2>
        </ClickableTile>
      </Column>
      <Column md sm={breakpoints.sm}>
        <ClickableTile href="/guide.epub" rel="external" class="sp--tile"
          ><h2 class="tile--title">Download as EPUB</h2></ClickableTile
        >
      </Column>
    </Row>
  </Grid>
  <footer>
    <p
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:dct="http://purl.org/dc/terms/"
    >
      <a
        class="sp--link"
        property="dct:title"
        rel="cc:attributionURL"
        href="https://ultimate-gtk4-crystal-guide.geopjr.dev"
        >Ultimate GTK4 Crystal Guide</a
      >
      by
      <a
        class="sp--link"
        rel="cc:attributionURL dct:creator"
        property="cc:attributionName"
        href="https://geopjr.dev/">GeopJr</a
      >
      is marked with
      <a
        class="sp--link"
        href="http://creativecommons.org/publicdomain/zero/1.0"
        target="_blank"
        rel="license noopener noreferrer"
        style="display:inline-block;"
        >CC0 1.0 Universal<img
          style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
          src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
          alt="cc"
        /><img
          style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
          src="https://mirrors.creativecommons.org/presskit/icons/zero.svg"
          alt="the digit 0 corssed out"
        /></a
      >
    </p>
  </footer>
</div>

<style lang="scss">
  :global(.sp--arrow--down) {
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 3rem 0;
  }

  :global(.sp--header) {
    min-height: 100vh;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: 3rem;
  }

  :global(.sp--grid) {
    margin-bottom: 1rem !important;
  }

  :global(.sp--tile) {
    height: 100%;
  }

  .sp--link {
    color: var(--cds-interactive-01);
    text-decoration: none;
  }
  .subTitle {
    flex-direction: column;
    display: flex;
    margin-top: 1rem;
  }

  .tile--title {
    margin-bottom: 1rem;
  }

  footer {
    font-weight: bold;
    text-align: center;
    padding: 0 2rem 2rem;
  }

  /* md */
  @media only screen and (min-width: 673px) {
    :global(.sp--grid) {
      margin-bottom: 5rem;
    }

    :global(.sp--header) {
      padding-top: 10rem;
    }

    .subTitle {
      flex-direction: row;
      justify-content: center;
    }
  }
</style>
