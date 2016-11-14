/**
 * Created by kendratate on 11/3/16.
 */
function ScoringService(){
    this.calculateFront9 = function(scores){
        var outScore = 0;
        validateScoresAreNumbers(scores);
        validateScoresArePositive(scores);
        for (var hole = 0; hole < 9; hole++) {
            outScore = outScore + scores[hole];
        }
        return outScore;
    }
    this.calculateBack9 = function(scores){
        var inScore = 0;
        validateScoresAreNumbers(scores);
        validateScoresArePositive(scores);
        for (var hole = 9; hole < 18; hole++) {
            inScore = inScore + scores[hole];
        }
        return inScore;
    }
    this.calculateTotal = function(scores){
        var totalScore = 0;
        validateScoresAreNumbers(scores);
        validateScoresArePositive(scores);
        for (var hole = 0; hole < 18; hole++) {
            totalScore = totalScore + scores[hole];
        }
        return totalScore;
    }
    this.calculateNet = function(playerScore, playerPar){
        isNaN(playerPar)? 0 : playerPar;rftg
        return (playerScore - playerPar);
    }

    function validateScoresAreNumbers(scores){
        for (var hole = 0; hole < 18; hole++) {
            if (isNaN(scores[hole])) {
                throw Error("Score must be a number");
            }
        }
    }

    function validateScoresArePositive(scores){
        for (var hole = 0; hole < 18; hole++){
            if(scores[hole]<1){
                throw Error("Entry must be a positive number");
            }
        }
    }

}
module.exports = ScoringService;
