/*
  ============================================================================
  THE HANS PARADIGM — Client logic
  ----------------------------------------------------------------------------
  Three responsibilities, kept small:
    1. Status bar — live UTC clock + a synthesized scan ID
    2. Rank filter — re-show rows by category, update the foot summary
    3. Explain panel — open one row at a time, accordion-style
  ============================================================================
*/

(function () {
  'use strict';

  const HansParadigm = {

    // ----------------------------------------------------------------------
    // 1. Status bar
    // ----------------------------------------------------------------------
    initStatusBar() {
      const clock = document.getElementById('clock');
      const scanId = document.getElementById('scan-id');

      // Deterministic scan ID for the current calendar date, e.g. "26171/A"
      // (day-of-year encoded in a way that feels like a real run identifier)
      const now = new Date();
      const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
      const dayOfYear = Math.floor((now - startOfYear) / 86400000);
      const yy = String(now.getUTCFullYear()).slice(-2);
      const id = `${yy}${String(dayOfYear).padStart(3, '0')} · A`;
      if (scanId) scanId.textContent = id;

      const tick = () => {
        if (!clock) return;
        const d = new Date();
        const hh = String(d.getUTCHours()).padStart(2, '0');
        const mm = String(d.getUTCMinutes()).padStart(2, '0');
        const ss = String(d.getUTCSeconds()).padStart(2, '0');
        clock.textContent = `${hh}:${mm}:${ss}`;
      };
      tick();
      setInterval(tick, 1000);
    },

    // ----------------------------------------------------------------------
    // 2. Rank filter — categories live on each row as data-cats="ml quant"
    // ----------------------------------------------------------------------
    initFilter() {
      const buttons = document.querySelectorAll('.filter-btn');
      const rows = document.querySelectorAll('.rank-row');
      const countEl = document.getElementById('rank-count');
      const filterEl = document.getElementById('rank-filter');

      const apply = (filter) => {
        let shown = 0;
        rows.forEach((row) => {
          const cats = (row.dataset.cats || '').split(/\s+/);
          const match = filter === 'all' || cats.includes(filter);
          row.classList.toggle('hidden', !match);
          if (match) shown += 1;
          // collapse any open Explain panels in hidden rows
          if (!match) row.setAttribute('aria-expanded', 'false');
        });
        // renumber visible rows so #01, #02, ... stays correct after filter
        let n = 1;
        rows.forEach((row) => {
          if (row.classList.contains('hidden')) return;
          const numEl = row.querySelector('.rr-num');
          if (numEl) numEl.textContent = String(n).padStart(2, '0');
          n += 1;
        });
        if (countEl) countEl.textContent = `${shown} of ${rows.length} projects`;
        if (filterEl) filterEl.textContent = filter;
      };

      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          buttons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          apply(btn.dataset.filter);
        });
      });
    },

    // ----------------------------------------------------------------------
    // 3. Explain panel — toggle on row click, accordion behavior
    // ----------------------------------------------------------------------
    toggle(triggerEl) {
      const row = triggerEl.closest('.rank-row');
      if (!row) return;
      const isOpen = row.getAttribute('aria-expanded') === 'true';

      // close all rows first (accordion)
      document.querySelectorAll('.rank-row').forEach((r) => {
        r.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        row.setAttribute('aria-expanded', 'true');
      }
    },

    // ----------------------------------------------------------------------
    // 3b. Mobile drawer — open/close, body scroll lock, focus management
    // ----------------------------------------------------------------------
    toggleDrawer() {
      const drawer = document.getElementById('nav-drawer');
      const open = drawer && drawer.classList.contains('open');
      if (open) this.closeDrawer(); else this.openDrawer();
    },
    openDrawer() {
      const drawer = document.getElementById('nav-drawer');
      const backdrop = document.getElementById('nav-backdrop');
      const toggle = document.getElementById('nav-toggle');
      if (!drawer || !backdrop) return;
      drawer.classList.add('open');
      backdrop.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.setAttribute('aria-hidden', 'false');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
      // focus first link for keyboard users
      const firstLink = drawer.querySelector('a');
      if (firstLink) firstLink.focus();
    },
    closeDrawer() {
      const drawer = document.getElementById('nav-drawer');
      const backdrop = document.getElementById('nav-backdrop');
      const toggle = document.getElementById('nav-toggle');
      if (!drawer || !backdrop) return;
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.setAttribute('aria-hidden', 'true');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
      document.body.classList.remove('no-scroll');
    },

    // ----------------------------------------------------------------------
    // 4. Keyboard shortcuts — power-user feel
    //      j / k → next / prev row
    //      enter / space → toggle current row
    //      esc → close all
    // ----------------------------------------------------------------------
    initKeyboard() {
      let focusIdx = -1;
      const visibleRows = () => Array.from(document.querySelectorAll('.rank-row'))
        .filter((r) => !r.classList.contains('hidden'));

      const focusRow = (idx) => {
        const rows = visibleRows();
        if (!rows.length) return;
        focusIdx = (idx + rows.length) % rows.length;
        const row = rows[focusIdx];
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        row.querySelector('.rr-trigger').focus();
      };

      document.addEventListener('keydown', (e) => {
        // ignore when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'j') { e.preventDefault(); focusRow(focusIdx + 1); }
        else if (e.key === 'k') { e.preventDefault(); focusRow(focusIdx - 1); }
        else if (e.key === 'Escape') {
          // close drawer if open; otherwise close any open Explain panel
          const drawer = document.getElementById('nav-drawer');
          if (drawer && drawer.classList.contains('open')) {
            HansParadigm.closeDrawer();
          } else {
            document.querySelectorAll('.rank-row').forEach((r) => r.setAttribute('aria-expanded', 'false'));
          }
        }
      });

      // make triggers focusable
      document.querySelectorAll('.rr-trigger').forEach((t) => {
        t.setAttribute('tabindex', '0');
        t.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            HansParadigm.toggle(t);
          }
        });
      });
    },

    init() {
      this.initStatusBar();
      this.initFilter();
      this.initKeyboard();
    },
  };

  // expose for inline onclick handlers
  window.HansParadigm = HansParadigm;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HansParadigm.init());
  } else {
    HansParadigm.init();
  }
})();
