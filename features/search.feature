Feature: Book tickets
    Scenario: Should book two tickets
        Given User is on "/index.php" page
        When User choose days after today to go "3"
        When User choose film 1 to 3 "1" and time 1 or 2 "2"
        When User choose row "5" and seat "7"
        When User choose row "5" and seat "8"
        When User click book button        
        Then User sees get QR code button 

    Scenario: Should book three tickets
        Given User is on "/index.php" page
        When User choose days after today to go "6"
        When User choose film 1 to 3 "3" and time 1 or 2 "1"
        When User choose row "10" and seat "1"
        When User choose row "5" and seat "7"
        When User choose row "5" and seat "8"
        When User click book button        
        Then User sees get QR code button 

    Scenario: Should check that user cant buy booked places
        Given User is on "/index.php" page
        When User choose days after today to go "1"
        When User choose film 1 to 3 "2" and time 1 or 2 "2"        
        When User choose row "7" and seat "9"
        When User choose row "7" and seat "10"
        When User click book button        
        When User click get QR code button
        When User go to "/index.php" page
        When User choose days after today to go "1"
        When User choose film 1 to 3 "2" and time 1 or 2 "2"        
        When User choose row "7" and seat "9"
        When User choose row "7" and seat "10"
        Then User sees disabled book button 