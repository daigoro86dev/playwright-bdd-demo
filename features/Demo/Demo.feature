@mode:parallel
Feature: Demo site

  @DemoUI
  Scenario Outline: Login User with <username>
    Given I open demo url "https://try.vikunja.io/login"
    Then I login with username "<username>" and password "<password>" credentials

    Examples:
      | username | password |
      | demo     | demo     |

  @DemoAPI
  Scenario Outline: Login User with <username> through API
    Given I login through API with username "<username>" and password "<password>" credentials
    Then I check the login token

    Examples:
      | username | password |
      | demo     | demo     |
