import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'hoofdstuk-1-netwerkstack-tcp-ip-fundamenten',
    'hoofdstuk-2-dns',
    'hoofdstuk-3-http',
    'hoofdstuk-4-https',
    'hoofdstuk-5-docker-fundamentals-introductie-tot-containers',
    'hoofdstuk-6-dockerfiles-images',
    'hoofdstuk-7-docker-compose-container-orchestration',
    'hoofdstuk-8-ci-cd-pipelines-professionele-git-workflows',
    'hoofdstuk-9-monitoring-logging-troubleshooting-websystemen',
    'hoofdstuk-10-auteursrecht-webontwikkeling-it',
    'hoofdstuk-11-ethiek-privacy-gdpr-webinfrastructuur',
    'hoofdstuk-12-integratieproject-presentatie-verdediging-reflectie',
  ],
};

export default sidebars;
