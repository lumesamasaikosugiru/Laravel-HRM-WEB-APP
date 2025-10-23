describe('Employees CRUD Test (Filament v4)', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8000/admin/login'); // Login

    cy.get('#form\\.email').type('admin@hrm.com');
    cy.get('#form\\.password').type('123123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/admin');
    cy.get('main', { timeout: 10000 }).should('be.visible');

    cy.contains('span.fi-sidebar-item-label', 'Employees')
      .scrollIntoView()
      .should('exist')
      .click({ force: true });

    cy.url({ timeout: 10000 }).should('include', '/admin/employees');
    cy.get('h1.fi-header-heading').should('contain.text', 'Employees');
  });

  it('Tambah data Employee baru dan verifikasi di tabel', () => {
    cy.contains('a', 'New employee')
      .should('exist')
      .scrollIntoView()
      .click({ force: true });

    cy.url({ timeout: 10000 }).should('include', '/admin/employees/create');
    cy.wait(1000);

    cy.get('#form\\.user_id').type('2');
    cy.get('#form\\.department_id').type('2');
    cy.get('#form\\.position_id').type('2');
    cy.get('#form\\.full_name').type('Safefull');
    cy.get('#form\\.email').type('safe.full@example.com');
    cy.get('#form\\.phone').type('081234567890');
    cy.get('#form\\.hire_date').type('2024-01-15');
    cy.get('#form\\.status').select('active', { force: true });
    cy.get('#form\\.photo_path').type('photos/safe.jpg');

    cy.contains('button', 'Create').scrollIntoView().click({ force: true });

    cy.url({ timeout: 10000 }).should('include', '/admin/employees');
    cy.get('table')
      .should('contain.text', 'Safefull')
      .and('contain.text', 'safe.full@example.com');
  });
});

describe('View & Delete Employee Test (Filament v4)', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8000/admin/login');
    cy.get('#form\\.email').type('admin@hrm.com');
    cy.get('#form\\.password').type('123123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/admin');

    cy.window().then((win) => {
      win.localStorage.setItem('filament.sidebar.collapsed', 'false');
    });
  });

  it('should view then delete employee successfully', () => {
    // Navigasi ke halaman Employees
    cy.get('a.fi-sidebar-item-btn')
      .contains('Employees', { matchCase: false })
      .scrollIntoView()
      .should('exist')
      .click({ force: true });

    cy.url({ timeout: 10000 }).should('include', '/admin/employees');
    cy.get('table', { timeout: 10000 }).should('exist');

    // Cari baris berdasarkan nama “Safefull”
    cy.contains('td', 'Safefull', { matchCase: false })
      .should('exist')
      .parents('tr')
      .within(() => {
        // Klik tombol View
        cy.get('button.fi-link')
          .filter((_, el) => el.textContent.trim().includes('View'))
          .click({ force: true });
      });

    // ✅ Pastikan modal View muncul dan verifikasi data
    cy.get('form.fi-modal-window:visible', { timeout: 10000 })
      .should('be.visible')
      .within(() => {cy.contains('h2', 'View employee').should('exist');

    // Full name
    cy.contains('dt', 'Full name', { matchCase: false })
      .closest('.fi-in-entry') // naik ke container entry
      .find('.fi-in-entry-content') // cari content area
      .should('contain.text', 'Safefull');

    // Email address
    cy.contains('dt', 'Email address', { matchCase: false })
      .closest('.fi-in-entry')
      .find('.fi-in-entry-content')
      .should('contain.text', 'safe.full@example.com');

    // Status (badge)
    cy.contains('dt', 'Status', { matchCase: false })
      .closest('.fi-in-entry')
      .find('.fi-in-entry-content')
      .should('contain.text', 'active');

    // Tutup modal
    cy.contains('button', 'Close').click({ force: true });
      });

    // Tunggu modal tertutup
    cy.wait(500);
    cy.get('form.fi-modal-window').should('not.exist');

    // ✅ Sekarang klik tombol Delete
    cy.contains('td', 'Safefull', { matchCase: false })
      .should('exist')
      .parents('tr')
      .within(() => {
        cy.get('button.fi-link')
          .filter((_, el) => el.textContent.trim().includes('Delete'))
          .click({ force: true });
      });

    // ✅ Tunggu modal Delete muncul
    cy.get('form.fi-modal-window:visible', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('button', 'Delete', { timeout: 10000 })
          .should('exist')
          .and('be.visible')
          .click({ force: true });
      });

    cy.wait(1500);
    cy.get('table').should('not.contain', 'Safefull');
  });
});
