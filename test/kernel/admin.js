/**
 * admin.js
 *
 * Tests for lib/kernel/admin.js
 */

const { describe, it } = require('mocha')
const chai = require('../chai-wrapper.js');
chai.then(loadedChai => { global.expect = loadedChai.expect; global.assert = loadedChai.assert; });


const Run = require('../env/run')
const unmangle = require('../env/unmangle')
const { _admin, _sudo } = unmangle(Run)

// ------------------------------------------------------------------------------------------------
// Admin
// ------------------------------------------------------------------------------------------------

describe('Admin', () => {
  describe('_admin', () => {
    it('returns false by default', () => {
      expect(_admin()).to.equal(false)
    })

    // ------------------------------------------------------------------------

    it('returns true only within sudo', () => {
      expect(_admin()).to.equal(false)
      _sudo(() => {
        expect(_admin()).to.equal(true)
      })
      expect(_admin()).to.equal(false)
    })
  })

  // --------------------------------------------------------------------------

  describe('_sudo', () => {
    it('supports nested sudo', () => {
      expect(_admin()).to.equal(false)
      _sudo(() => {
        expect(_admin()).to.equal(true)
        _sudo(() => {
          expect(_admin()).to.equal(true)
        })
        expect(_admin()).to.equal(true)
      })
      expect(_admin()).to.equal(false)
    })
  })
})

// ------------------------------------------------------------------------------------------------
