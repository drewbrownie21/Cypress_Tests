// Add as many urls as needed here to test
const routes = [
'https://testpages.eviltester.com/styled/basic-javascript-validation-test.html'
];
  
// Setups nice table in terminal when running cypress
const terminalLog = (violations) => {
    cy.task(
    'log',
    `${violations.length} accessibility violation${
        violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length
    })
    )
    
    cy.task('table', violationData)
}
  
  
describe('Component accessibility test', () => {
    routes.forEach(url => {
        it(`Testing Accessibility for ${url}`, () => {
            cy.visit(url);
            cy.injectAxe();
            // cy.checkA11y([context], [options], [violationsCallback], [skipFailures]);
            // Parameter 1: Pass a specific DOM element to test or null to test all
            // Parameter 2: null to see all issues, {includedImpacts: ['critical']} to see only specificed issues
            // Options are critical, serious, moderate and minor 
            // Can also pass rules { rules: { 'region': { enabled: false } } } for example 
            // Parameter 3: if set to null, no failure table will display in terminal. terminalLog displays results
            // Parametr 4: bool, if true, accessibility issues wont fail test
            cy.checkA11y(
                null, 
                null, 
                terminalLog, 
                false
                );
        });
    });
});