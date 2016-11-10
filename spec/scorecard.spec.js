/**
 * Created by kendratate on 11/3/16.
 */
describe('ScoringService', function(){
    var ScoringService = require('../src/scorecard.js');
    var scoringService;
    var scores = [];


    beforeEach(function (){
        scoringService = new ScoringService;

        for (var hole = 0; hole < 18; hole++){
            scores[hole] = 1;
        }
    });

    // test for front 9 (or out) scores
    describe('calculateFront9', function(){
        it('should throw an error if any input is not a number', function(){
            var undefinedScores = [];
            var alphaScores = ['A'];
            var symbolScores = ['%'];

            function undefinedInputs (){
                scoringService.calculateFront9(undefinedScores);
            }

            function alphaInputs (){
                scoringService.calculateFront9(alphaScores);
            }

            function symbolInputs(){
                scoringService.calculateFront9(symbolScores);
            }

            expect(undefinedInputs).toThrow();
            expect(alphaInputs).toThrow();
            expect(symbolInputs).toThrow();

        });
        it('should output total of first 9 holes', function(){

            scores[0] = 4;
            scores[1] = 5;
            scores[5] = 3;
            scores[17] = 3;
            var out = scoringService.calculateFront9(scores);  //call to function in scorecard.js
            expect(out).toBe(18);
        });
        it('should total even if there are scores missing', function(){

            scores[0] = 4;
            scores[5] = 8;
            scores[12] = 5;

            var out = scoringService.calculateFront9(scores);
            expect(out).toBe(19);
            expect(function(){scoringService.calculateFront9(scores)}).not.toThrow();
        });
        it('should throw error on negative number', function(){

            scores[3] = -2;

            function errorcheck (){
                scoringService.calculateFront9(scores);
            }

            expect(errorcheck).toThrow();

        });
    });
    // test for back 9  (or in) calculations
    describe('calculateBack9', function(){
        it('should throw an error if any input is not a number', function(){
            var undefinedScores = [];
            var alphaScores = ['A'];
            var symbolScores = ['%'];


            function undefinedInputs (){
                scoringService.calculateBack9(undefinedScores);
            }

            function alphaInputs (){
                scoringService.calculateBack9(alphaScores);
            }

            function symbolInputs(){
                scoringService.calculateBack9(symbolScores);
            }

            expect(undefinedInputs).toThrow();
            expect(alphaInputs).toThrow();
            expect(symbolInputs).toThrow();

        });
        it('should output total of last 9 holes', function(){

            scores[0] = 4;
            scores[1] = 5;
            scores[5] = 3;
            scores[9] = 4;
            scores[17] = 3;
            scores[12] = 4;

            var inscore = scoringService.calculateBack9(scores);  //call to function in scorecard.js
            expect(inscore).toBe(17);
        });

        it('should throw error on negative number', function(){

            scores[12] = -4;

            function errorcheck (){
                scoringService.calculateBack9(scores);
            }

            expect(errorcheck).toThrow();
        });
    });

    // test for total score calculation
    describe('calculateTotal', function(){
        it('should throw an error if any input is not a number', function(){
            var undefinedScores = [];
            var alphaScores = ['A'];
            var symbolScores = ['%'];


            function undefinedInputs (){
                scoringService.calculateTotal(undefinedScores);
            }

            function alphaInputs (){
                scoringService.calculateTotal(alphaScores);
            }

            function symbolInputs(){
                scoringService.calculateTotal(symbolScores);
            }

            expect(undefinedInputs).toThrow();
            expect(alphaInputs).toThrow();
            expect(symbolInputs).toThrow();

        });
        it('should output the total score for all 18 holes', function(){

            scores[0] = 4;
            scores[1] = 5;
            scores[5] = 3;
            scores[9] = 4;
            scores[17] = 3;
            scores[12] = 4;

            var inscore = scoringService.calculateTotal(scores);  //call to function in scorecard.js
            expect(inscore).toBe(35);
        });

        it('should throw an error on negative numbers in input', function() {

            scores[12] = -4;
            scores[3] = -3;

            function errorcheck (){
                scoringService.calculateTotal(scores);
            }

            expect(errorcheck).toThrow();
        });

    });

    describe('calculateNet', function(){
        it('should output your total score minus total par (net score)', function(){
            var playerScore = 75;
            var playerPar = 72;

            var netScore = scoringService.calculateNet(playerScore, playerPar);

            expect(netScore).toBe(3);
            expect(function(){scoringService.calculateNet(playerScore, playerPar)}).not.toThrow();

        });

        it('should throw an error when par is not defined', function(){
            var playerScore = 75;
            expect(function(){scoringService.calculateNet(playerScore, undefined)}).not.toThrow();
        });
    });

});

