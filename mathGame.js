$(document).ready(function() {
    var randomNumber1;
    var randomNumber2;
    var mathResult;
    var questionType;
    var points = 0; // Points tracked as long as page isn't refreshed.
    var failures = 0; // Same for failures.

    $("#inputAnswer").prop('disabled', true);

    /**
     * Generate and present a math problem based on two random numbers between 1 and 1000.
     * Check which radio button is selected to determine problem type.
     * React to button click.
     */
    $("#getQuestion").click(function() {
        randomNumber1 = Math.floor((Math.random() * 1000) + 1);
        randomNumber2 = Math.floor((Math.random() * 1000) + 1);
        questionType = $('input:radio[name=mathType]:checked').val();

        if (questionType == "addition") {
            $("#question").html("What is " + randomNumber1 + " + " + randomNumber2 + "?");
            mathResult = randomNumber1 + randomNumber2;
        } else if (questionType == "subtraction") {
            $("#question").html("What is " + randomNumber1 + " - " + randomNumber2 + "?");
            mathResult = randomNumber1 - randomNumber2;
        } else {
            $("#question").html("What is " + randomNumber1 + " * " + randomNumber2 + "?");
            mathResult = randomNumber1 * randomNumber2;
        }
        $("#inputAnswer").prop("disabled", false);
    });

    /**
     * Submit answer to the presented problem.
     * Compare submitted answer to generated problem, determine if right or wrong.
     * Add point / failure depending on if answer is right or wrong.
     * Print points & failures on bottom.
     * Generates new math problem when answer is submitted.
     */
    $("#submit").click(function() {
        var userNumber = $("#inputAnswer").val();

        var correct;

        if (mathResult == userNumber) {
            correct = true;
            $("#answer").css("color", "#AFA");
            points++;
        } else {
            correct = false;
            $("#answer").css("color", "#FAA");
            failures++;
        }

        if (correct) {
            $("#answer").html("You're right," +
                "<br>the answer is " + mathResult + "!");
        } else {
            $("#answer").html("You're wrong," +
                "<br>the answer is " + mathResult + "!");
        }
        if (points == 1) {
            $("#points").html("You have " + points + " point.");
        } else {
            $("#points").html("You have " + points + " points.");
        }

        if (failures == 1) {
            $("#failures").html("You have answered " + failures + " problem incorrectly.");
        } else {
            $("#failures").html("You have answered " + failures + " problems incorrectly.");
        }

        $("#inputAnswer").val("");
        $("#getQuestion").click();

    });

    /**
     * Accept keyboard input to trigger submit function.
     * Pressing enter key when answer field is marked submits.
     */
    $("#inputAnswer").keypress(function(event) {
        if (event.keyCode == 13) {
            $("#submit").click();
        }
    });
});
