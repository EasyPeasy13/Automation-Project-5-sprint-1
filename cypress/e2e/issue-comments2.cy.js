describe('Issue comments creating, editing and deleting', () => {

    const selectors = {
      issueDetailsModal: '[data-testid="modal:issue-details"]',
      commentBox: 'textarea[placeholder="Add a comment..."]',
      comment: '[data-testid="issue-comment"]',
      saveButton: 'button:contains("Save")',
      deleteButton: 'button:contains("Delete")',
      confirmDelete: '[data-testid="modal:confirm"] button:contains("Delete comment")'
    };
  
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.visit('/board').contains('This is an issue of type: Task.').click();
      cy.get('[data-testid="modal:issue-details"]'), { timeout: 60000 }

      })
    });
  
    it('Should create, edit and delete comment successfully', () => {
      const initialComment = 'TEST_COMMENT';
      const editedComment = 'TEST_COMMENT_EDITED';
  
      cy.get('[data-testid="modal:issue-details"]'), { timeout: 60000 }
      cy.get(selectors.issueDetailsModal)
        .within(() => {
          cy.contains('Add a comment...').click();
          cy.get(selectors.commentBox).type(initialComment);
          cy.contains('button', 'Save').click();
          cy.get(selectors.comment).should('contain', initialComment);
  
          cy.get(selectors.comment).contains('Edit').click();
          cy.get(selectors.commentBox).clear().type(editedComment);
          cy.contains('button', 'Save').click();
          cy.get(selectors.comment).should('contain', editedComment);
  
          cy.contains('Delete').click();
        });
  
      cy.get(selectors.confirmDelete).click();
      cy.get(selectors.issueDetailsModal).should('not.contain', editedComment);
    });
  });