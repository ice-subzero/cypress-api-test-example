Feature: login

    Background:
        Given user open browser and go to login page

    Scenario Outline: User able to login with valid username and password
        When user input username with "<user>"
        And user input password with "<password>"
        And user click login button
        # Then system redirect to home page
        Examples:
            | user  | password |
            | admin | admin123 |
            | alice | P@$w0rd  |
            | bob   | 12345678 |
