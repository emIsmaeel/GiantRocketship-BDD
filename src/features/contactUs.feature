Feature: Contact Us
  As a user, I want to submit the Contact Us form with valid or invalid data so that I can verify the correct error messages or success message.

  Scenario: Display errors when the form is submitted empty
    Given I am on the Contact Us page
    When I submit the form 'without filling any fields'
    Then I should see error messages for all required fields

  Scenario: Display errors when only the name is provided
    Given I am on the Contact Us page
    When I enter the first name 'John' and last name 'Doe'
    And I submit the form 'with filled data'
    Then I should see error messages for the required fields: email and comment

  Scenario: Display error when name and email are provided without a comment
    Given I am on the Contact Us page
    When I enter the first name 'John', last name 'Doe', email 'hello@giantrocketship.com', and comment ''
    And I submit the form 'with filled data'
    Then I should not see any error
