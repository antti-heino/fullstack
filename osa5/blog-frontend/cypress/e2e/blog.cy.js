describe('Blog tests', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'mockUser',
      password: 'qwerty',
      name: 'Mock User',
    }
    cy.request('POST', 'http://localhost:3002/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login renders correctly', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('User can login', function () {
      cy.get('#username').type('mockUser')
      cy.get('#password').type('qwerty')
      cy.get('#login-btn').click()
      cy.contains('Mock User logged in')
    })

    it('Cannot login with wrong password', function () {
      cy.get('#username').type('mockUser')
      cy.get('#password').type('asdfg')
      cy.get('#login-btn').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'mockUser', password: 'qwerty' })
      })

      it('Can add a blog', function () {
        cy.contains('Create new blog').click()
        cy.get('#title').type('Mock Title')
        cy.get('#author').type('Mock author')
        cy.get('#url').type('http://blogurl.com')
        cy.get('#create-blog-form').contains('Create').click()

        cy.get('.success').should('contain', 'New blog created')
        cy.should('contain', 'Mock Title')
        cy.should('contain', 'Mock author')
      })

      describe('and one blog exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Mock 2',
            author: 'Mock author',
            url: 'http://mock.fi',
          })
        })

        it('Like works', function () {
          cy.get('.blog').contains('view').click()
          cy.get('.blogdetails').should('contain', '0 Likes')
          cy.addLike('Another blog from Cypress')
          cy.get('.blogdetails').should('contain', '1 Like')
        })

        it('Delete works', function () {
          cy.get('.blog').contains('view').click()
          cy.get('.blogdetails').contains('delete').click()
          cy.should('not.contain', 'Mock 2')
        })
      })

      describe('Blog list', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Mock 1',
            author: 'Mock author',
            url: 'http://mock.fi',
            likes: 1
          })
            .then(() =>
              cy.createBlog({
                title: 'Mock 2',
                uthor: 'Mock author',
                url: 'http://mock.fi',
                likes: 2
              })
            )
            .then(() =>
              cy.createBlog({
                title: 'Mock 3',
                uthor: 'Mock author',
                url: 'http://mock.fi',
                likes: 3
              })
            )
        })

        it('Blog are ordered by likes', function () {
          cy.get('.blog>span.blog-title').then((blogs) => {
            expect(blogs[0].textContent).to.equal('Mock 3')
            expect(blogs[1].textContent).to.equal('Mock 2')
            expect(blogs[2].textContent).to.equal('Mock 1')
          })
        })
      })
    })
  })
})