describe('Testing APIs...', () => {
    const URL = 'http://uitestingplayground.com/'

    beforeEach('', () => {
        cy.visit(URL)
        cy.request("GET", URL).then((repsonse) => {
            expect(repsonse.status).to.be.equal(200)
        })
    })

    it('Dynamic ID', () => {
        cy.gotopage('dynamicid')
        cy.get('.btn')
            .should('contain', 'Dynamic ID')
            .click()
    })

    context('Class ID', () => {
        beforeEach('', () => {
            cy.gotopage('classattr')
        })

        it('Class 1 - Button Warning', () => {
            cy.on('window:alert', alertText => {
                expect(alertText).to.be.eq('Primary button pressed')
            })

            cy.get('.btn-warning')
                .should('contain', 'Button')
                .click()
        })

        it('Class 2 - Primary Button', () => {
            cy.on('window:alert', alertText => {
                expect(alertText).to.be.eq('Primary button pressed')
            })

            cy.get('.btn-primary')
                .should('contain', 'Button')
                .click()
        })

        it('Class 2 - Success Button', () => {
            cy.get('.btn-success')
                .should('contain', 'Button')
                .click()
        })


    })

    it('Hidden Layers', () => {
        // Click a button and make sure the new button appears on top of old button
        cy.gotopage('hiddenlayers')
        cy.get('.btn-success')
            .should('be.visible')
            .click()
        cy.get('btn-success')
            .should('not.exist')
        cy.get('.btn-primary')
            .should('be.visible')
    })

    it('Load Delay', () => {
        // Wait for a page to load with a large built in wait
        cy.gotopage('loaddelay', 20000)
        cy.get('.btn-primary')
            .should('be.visible')
    })

    it('AJAX', () => {
        // Wait for a page to load with a large built in wait
        cy.gotopage('ajax')
        cy.get('.btn-primary')
            .should('be.visible')
            .click()
        cy.contains('Data loaded with AJAX get request.', {timeout:20000})
    })

    it('Client Side Delay', () => {
        cy.gotopage('clientdelay')
        cy.get('.btn-primary')
            .should('be.visible')
            .click()
        cy.contains('Data calculated on the client side.', {timeout:20000})
    })

    it('Click', () => {
        // Clicking the button with a mouse emulator to make the button change
        cy.gotopage('click')
        cy.get('.btn-primary')
            .should('be.visible')
            .click()
        cy.get('.btn-primary')
            .should('not.exist')
        cy.get('.btn-success')
            .should('exist')
    })

    context('Text Input Page', () => {
        beforeEach('Go to Text Input page', () => {
            cy.gotopage('textinput')
            cy.get('.btn-primary')
                .should('contain', "Button That Should Change it's Name Based on Input Value")
        })

        it('Input a string, check the button text changes', () => {
            const NEW_BUTTON_NAME = "New Button For Testing"
            
            cy.get('#newButtonName')
                .clear()
                .type(NEW_BUTTON_NAME)
    
            cy.get('.btn-primary')
                .click()
    
            cy.get('.btn-primary')
                .should('contain', NEW_BUTTON_NAME)
        })
        it('Input a blank string', () => {
            const NEW_BUTTON_NAME = " "
            
            cy.get('#newButtonName')
                .clear()
                .type(NEW_BUTTON_NAME)
    
            cy.get('.btn-primary')
                .click()
    
            cy.get('.btn-primary')
                .should('contain', NEW_BUTTON_NAME)
        })
        it('Input a long string (100 chars)', () => {
            const NEW_BUTTON_NAME = new Array(100).join('A')
            
            cy.get('#newButtonName')
                .clear()
                .type(NEW_BUTTON_NAME)
    
            cy.get('.btn-primary')
                .click()
    
            cy.get('.btn-primary')
                .should('contain', NEW_BUTTON_NAME)
        })
    })

    it('Testing a Dynamic Table', () => {
        cy.gotopage('dynamictable')
        cy.get('.bg-warning').then((cpu_text) => {
            let text = cpu_text.text()
            let browser_text = text.split(' ')[0]
            let cpu_usage_text = text.split(' ')[2]

            cy.get('[role="table"]')
                .should('contain', cpu_usage_text)
        })
    })

    it('Testing a Progress Bar', () => {
        cy.gotopage('progressbar')

        cy.get('.btn-primary')
            .contains('Start')
            .click()

        cy.get('#progressBar')
            .contains('75', {timeout:30000})

        cy.get('.btn-info')
            .contains('Stop')
            .click()
    })

    it('Testing Visibility of Buttons', () => {
        cy.gotopage('visibility')

        const BUTTONS_ID = {
            'removedButton' : 'not.exist', 
            'zeroWidthButton' : "not.be.visible", 
            'overlappedButton' : "isHidden", 
            'transparentButton' : "not.be.visible",
            'invisibleButton' : "not.be.visible",
            'notdisplayedButton' : "not.be.visible",
            'offscreenButton' : "be.visible"
        }

        // Make sure the buttons are visible
        for(let key in BUTTONS_ID){
            cy.get(`#${key}`)
                .should('be.visible')
        }

        // Click the hide button
        cy.get('.btn-primary')
            .contains('Hide')
            .click()

        // Now make sure the buttons are not visible
        for(let btn_id in BUTTONS_ID){
            // For the overlapped button lets check that is is hidden
            if(btn_id == 'overlappedButton'){
                cy.get(`#${btn_id}`).then(($el) => {
                    expect(Cypress.dom.isHidden($el)).to.be.true
                  })
            }else{
            cy.get(`#${btn_id}`)
                .should(BUTTONS_ID[btn_id])
            }
        }
        
        
    })
})