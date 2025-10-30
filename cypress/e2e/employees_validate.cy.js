describe('Employees Form Validation Test (Filament v4)', () => {
  beforeEach(() => {
    // 🔹 Login ke Filament Admin
    cy.visit('http://127.0.0.1:8000/admin/login');
    cy.get('#form\\.email').type('admin@hrm.com');
    cy.get('#form\\.password').type('123123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/admin');
    cy.contains('span.fi-sidebar-item-label', 'Employees')
      .scrollIntoView()
      .click({ force: true });

    cy.url().should('include', '/admin/employees');
    cy.contains('a', 'New employee').click({ force: true });
    cy.url().should('include', '/admin/employees/create');
  });

  it('Menampilkan error saat semua field kosong', () => {
    cy.contains('button', 'Create').click({ force: true });

    // Memastikan pesan error muncul di field required
    cy.get('#form\\.user_id:invalid').should('exist');
    cy.get('#form\\.department_id:invalid').should('exist');
    cy.get('#form\\.position_id:invalid').should('exist');
    cy.get('#form\\.full_name:invalid').should('exist');
    cy.get('#form\\.email:invalid').should('exist');
  });

  it('Menampilkan error saat format email tidak valid', () => {
    cy.get('#form\\.user_id').type('2');
    cy.get('#form\\.department_id').type('2');
    cy.get('#form\\.position_id').type('2');
    cy.get('#form\\.full_name').type('Invalid Email User');
    cy.get('#form\\.email').type('invalid-email'); // ga pake  '@'
    cy.get('#form\\.phone').type('081234567890');
    cy.get('#form\\.hire_date').type('2024-01-15');
    cy.get('#form\\.status').select('active', { force: true });
    cy.get('#form\\.photo_path').type('photos/test.jpg');

    cy.contains('button', 'Create').click({ force: true });

   
    cy.get('#form\\.email:invalid').should('exist');
  });

  it('Tidak boleh input selain angka di field ID', () => {
    cy.get('#form\\.user_id').type('abc');
    cy.get('#form\\.department_id').type('!@#');
    cy.get('#form\\.position_id').type('text');

    //  field hanya menerima angka
    cy.get('#form\\.user_id').should('have.value', '');
    cy.get('#form\\.department_id').should('have.value', '');
    cy.get('#form\\.position_id').should('have.value', '');
  });

  it('Menolak jika Status tidak dipilih', () => {
    cy.get('#form\\.user_id').type('2');
    cy.get('#form\\.department_id').type('2');
    cy.get('#form\\.position_id').type('2');
    cy.get('#form\\.full_name').type('No Status User');
    cy.get('#form\\.email').type('nostatus@example.com');
    cy.get('#form\\.phone').type('081234567890');
    cy.get('#form\\.hire_date').type('2024-01-15');
    // jika status tidak dipilih seharusnya ga bisa sih
    cy.get('#form\\.photo_path').type('photos/test.jpg');

    cy.contains('button', 'Create').click({ force: true });
    cy.get('#form\\.status:invalid').should('exist');
  });

  it('Berhasil submit jika semua input valid', () => {
    cy.get('#form\\.user_id').type('2');
    cy.get('#form\\.department_id').type('2');
    cy.get('#form\\.position_id').type('2');
    cy.get('#form\\.full_name').type('Valid User');
    cy.get('#form\\.email').type('valid.user@example.com');
    cy.get('#form\\.phone').type('081234567890');
    cy.get('#form\\.hire_date').type('2024-01-15');
    cy.get('#form\\.status').select('active', { force: true });
    cy.get('#form\\.photo_path').type('photos/valid.jpg');

    cy.contains('button', 'Create').click({ force: true });

    cy.url({ timeout: 10000 }).should('include', '/admin/employees');
    cy.get('table')
      .should('contain.text', 'Valid User')
      .and('contain.text', 'valid.user@example.com');
  });
});
