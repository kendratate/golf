/**
 * Created by kendratate on 11/3/16.
 */
function ScoringService(){
    this.calculateFront9 = function(scores){
        var out = 0;
        for (var score = 0; score < 9; score++) {
            out = out + scores[score];
        }
        return out;
    }
    this.calculateBack9 = function(){

    }
}
module.exports = ScoringService;
