describe('Login Page Test', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8000/admin/login');
    cy.wait(1000); // tunggu 1 detik agar form benar-benar termuat
  });

  it('Menampilkan form login dengan benar', () => {
    cy.get('#form\\.email').should('be.visible');
    cy.get('#form\\.password').should('be.visible');
  });

  it('Menolak login dengan form kosong', () => {
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin/login'); // masih di halaman login
  });
  
  it('Menolak login dengan kredensial salah', () => {
    cy.get('#form\\.email').type('salah@example.com');
    cy.get('#form\\.password').type('passwordsalah');
    cy.get('button[type="submit"]').click();
    cy.contains('These credentials do not match').should('be.visible');
  });

  it('Berhasil login dengan kredensial benar', () => {
    cy.get('#form\\.email').type('admin@hrm.com');
    cy.get('#form\\.password').type('123123');
    cy.get('button[type="submit"]').click();

  
  });
});
