# Hidden Sections

This file tracks UI sections and navigation items that are temporarily hidden, plus how to enable them again.

## Competition section (comparison table)

Status: hidden from the home page.

The component renders a styled comparison table showing AVAIL vs FitrWomen, WHOOP, Oura, Garmin, Catapult Sports, and Kitman Labs across four columns: Female-specific modelling, Data tracking, Decision integration, Continuous learning.

### Hidden files

- `src/pages/HomePage.tsx`
- `src/components/CompetitionSection.tsx` (component file preserved, not deleted)

### How to enable

1. In `src/pages/HomePage.tsx`, add the import back:

```tsx
import CompetitionSection from '../components/CompetitionSection'
```

2. In `src/pages/HomePage.tsx`, render the section between `SolutionSection` and `FAQSection`:

```tsx
{/* ─── Competition ──────────────────────────────────── */}
<CompetitionSection />
```

---

## Problem section (competitor matrix)

Status: hidden from the home page. Replaced by `CompetitionSection`.

The component renders an interactive positioning matrix plotting AVAIL vs competitors (WHOOP, Oura, Catapult, Kitman Labs, FitrWoman) on "Tracking ↔ Decision Integration" and "Data Collection ↔ Female-Specific Models" axes with hover interactions.

### Hidden files

- `src/pages/HomePage.tsx`
- `src/components/ProblemSection.tsx` (component file preserved, not deleted)

### How to enable

1. In `src/pages/HomePage.tsx`, add the import back:

```tsx
import ProblemSection from '../components/ProblemSection'
```

2. In `src/pages/HomePage.tsx`, render the section (e.g. between Hero and SolutionSection):

```tsx
{/* ─── Problem ──────────────────────────────────────── */}
<ProblemSection />
```

---

## Join waitlist validated by

Status: hidden from the Join waitlist page right-side panel.

### Hidden files

- `src/pages/JoinPilotProgrammePage.tsx`

### How to enable

1. In `src/pages/JoinPilotProgrammePage.tsx`, find the `Validated By` section near the bottom of the right-side value props panel.

2. Remove the temporary conditional wrapper:

```tsx
{false && (
  <section className="py-8 text-center">
    ...
  </section>
)}
```

Restore it to:

```tsx
<section className="py-8 text-center">
  ...
</section>
```

## Team section

Status: hidden from the home page, header navigation, and footer links.

### Hidden files

- `src/pages/HomePage.tsx`
- `src/components/Nav.tsx`
- `src/components/Footer.tsx`

### How to enable

1. In `src/pages/HomePage.tsx`, add the import back:

```tsx
import TeamSection from '../components/TeamSection'
```

2. In `src/pages/HomePage.tsx`, render the section between `SolutionSection` and `FAQSection`:

```tsx
{/* ─── Team ─────────────────────────────────────────── */}
<TeamSection />
```

3. In `src/components/Nav.tsx`, add the desktop header link back inside the desktop `<ul>`:

```tsx
<li>
  <a
    href="/#team-headline"
    className="text-fluid-base font-medium text-[#4B5563] hover:text-[#111318] transition-colors duration-150"
  >
    Science
  </a>
</li>
```

4. In `src/components/Nav.tsx`, add the mobile menu link back:

```tsx
<a
  href="/#team-headline"
  onClick={closeMobileMenu}
  className="rounded-[8px] px-3 py-3 text-fluid-md font-semibold text-[#374151] active:bg-[#EEF2F5]"
>
  Science
</a>
```

5. In `src/components/Footer.tsx`, restore the Team footer link:

```tsx
links: ["About", "Team", "Contact"],
```

## Pricing

Status: hidden from routes, desktop header navigation, mobile header navigation, and footer links.

The pricing page and modal components still exist in the codebase, but they are not reachable from the current UI.

### Hidden files

- `src/App.tsx`
- `src/components/Nav.tsx`
- `src/components/Footer.tsx`
- `src/pages/PricingPage.tsx`
- `src/components/PricingComingSoonModal.tsx`

### How to enable

1. In `src/App.tsx`, import the pricing page:

```tsx
import PricingPage from './pages/PricingPage'
```

2. In `src/App.tsx`, add the route inside `<Routes>`:

```tsx
<Route path="/pricing" element={<PricingPage />} />
```

3. In `src/components/Nav.tsx`, import the pricing modal:

```tsx
import PricingComingSoonModal from "./PricingComingSoonModal";
```

4. In `src/components/Nav.tsx`, add the modal state and open handler inside `Nav`:

```tsx
const [showPricingModal, setShowPricingModal] = useState(false);

const openPricingModal = () => {
  closeMobileMenu();
  setShowPricingModal(true);
};
```

5. In `src/components/Nav.tsx`, add the desktop header button back inside the desktop `<ul>`:

```tsx
<li>
  <button
    type="button"
    onClick={openPricingModal}
    className="text-fluid-base font-medium text-[#4B5563] hover:text-[#111318] transition-colors duration-150"
  >
    Pricing
  </button>
</li>
```

6. In `src/components/Nav.tsx`, add the mobile menu button back:

```tsx
<button
  type="button"
  onClick={openPricingModal}
  className="rounded-[8px] px-3 py-3 text-left text-fluid-md font-semibold text-[#374151] active:bg-[#EEF2F5]"
>
  Pricing
</button>
```

7. In `src/components/Nav.tsx`, render the modal before the component closes:

```tsx
<AnimatePresence>
  {showPricingModal && (
    <PricingComingSoonModal onClose={() => setShowPricingModal(false)} />
  )}
</AnimatePresence>
```

If `Nav` currently returns only `<header>...</header>`, wrap the header and modal in a fragment:

```tsx
return (
  <>
    <header>...</header>
    <AnimatePresence>...</AnimatePresence>
  </>
);
```

8. In `src/components/Footer.tsx`, import pricing modal helpers:

```tsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PricingComingSoonModal from "./PricingComingSoonModal";
```

Replace the current `framer-motion` import if needed, so `motion` is not imported twice.

9. In `src/components/Footer.tsx`, restore the footer Pricing link:

```tsx
links: ["Overview", "How it works", "Pricing"],
```

10. In `src/components/Footer.tsx`, add the modal state inside `Footer`:

```tsx
const [showPricingModal, setShowPricingModal] = useState(false);
```

11. In `src/components/Footer.tsx`, add the Pricing branch back inside `links.map` before the `How it works` branch:

```tsx
link === "Pricing" ? (
  <button
    key={link}
    type="button"
    onClick={() => setShowPricingModal(true)}
    className="self-start text-left text-fluid-base font-medium text-[#6B7280] hover:text-[#111318] transition-colors duration-150 leading-snug"
  >
    {link}
  </button>
) : link === "How it works" ? (
```

12. In `src/components/Footer.tsx`, render the modal before the component closes:

```tsx
<AnimatePresence>
  {showPricingModal && (
    <PricingComingSoonModal onClose={() => setShowPricingModal(false)} />
  )}
</AnimatePresence>
```

If `Footer` currently returns only `<footer>...</footer>`, wrap the footer and modal in a fragment:

```tsx
return (
  <>
    <footer>...</footer>
    <AnimatePresence>...</AnimatePresence>
  </>
);
```

13. Run a build after restoring hidden UI:

```bash
npm run build
```
