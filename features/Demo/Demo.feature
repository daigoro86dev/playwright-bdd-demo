@mode:parallel
Feature: Demo site

  @DemoUI
  Scenario Outline: Login User with <username>
    Given I open demo url "https://try.vikunja.io/login"
    Then I login with username "<username>" and password "<password>" credentials

    Examples:
      | username | password |
      | demo     | demo     |

  @DemoUI
  Scenario: Register User
    Given I open demo url "https://try.vikunja.io/login"
    When I click the Create Account link
    Then I register a new user

  @DemoAPI
  Scenario Outline: Login User with <username> through API
    Given I login through API with username "<username>" and password "<password>" credentials
    Then I check the login token

    Examples:
      | username | password |
      | demo     | demo     |

  @DemoAPI
  Scenario: Register User through API
    Given I register through API
    Then I check the registered user
