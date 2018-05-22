import * as Type from './mutation-types'

const matutations = {
  [Type.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}

export default matutations
