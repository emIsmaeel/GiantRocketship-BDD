Feature: Contact Us
  As a user, I want to submit the Contact Us form with valid data so that I can get in touch with the team.

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
    When I enter the first name 'John', last name 'Doe', and email 'john.doe@test.com'
    And I submit the form 'with filled data'
    Then I should see an error message for the required field: comment

  Scenario: Successful form submission
    Given I am on the Contact Us page
    When I enter the first name 'John', last name 'Doe', email 'john.doe@test.com', and comment 'QA testing'
    And I submit the form 'with filled data'
    Then I should see a success message indicating the form was submitted successfully
