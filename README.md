# tritmapped-canvas

Tricolor tritmapped canvas display

Usage:

    var Tricanvas = require('tritmapped-canvas');

    var t = Tricanvas(opts);

    for (i = 16400; i < 81*81*5; ++i)
      t.tritmap[i] = 80; // 1000i

    t.refresh();

Displays a visual representation of [balanced-ternary](https://github.com/thirdcoder/balanced-ternary)
using three colors (trichromatic, comparable to monochrome on binary systems, but with three colors).
The display is "tritmapped" (comparable to bitmapped), meaning each trit (base 3 digit) represents a pixel.

For an example, run `npm start`.

Options:

* `addressTryteSize` (4): number of trits for each tryte for addressing each coordinate (ex: aaaa bbbb)
* `width`, `height` (calculated from 3^addressTryteSize times trits/tryte(5)): pixel dimensions
* `scaleW`, `scaleH`: scaling factors
* `canvas`: HTML5 canvas element, created if unspecified
* `tritmap`: typed array of trits (should be an `Int8Array` or compatible, for 5-trits/tryte, ±121)
* `negativeColor` (`[255, 0, 0, 255]`): RGBA pixel color for negative trits
* `zeroColor` (`[0, 0, 0, 255]`): RGBA color for zero trits
* `positiveColor` (`[0, 255, 0, 255]`): RGBA color for positive trits

API:

## t.refresh()

Redraws the canvas from `t.tritmap`.

## t.writeTrit(trit, x, y)

Sets the coordinate (x,y) to `trit` (-1,0,1).

## t.writeTrits(bts, width, height, rowStart, colStart)

Sets a rectangular area of trits to a [balanced-ternary](https://github.com/thirdcoder/balanced-ternary) string,
starting at (rowStart,colStart), of dimensions (width,height).

