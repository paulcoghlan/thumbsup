const path = require('path')
const should = require('should/as-function')
const options = require('../../bin/options.js')

const BASE_ARGS = ['--input', 'photos', '--output', 'website']

describe('options', function () {
  it('--input is converted to an absolute path', () => {
    const opts = options.get(BASE_ARGS)
    should(opts.input).eql(path.join(process.cwd(), 'photos'))
  })
  it('--output is converted to an absolute path', () => {
    const opts = options.get(BASE_ARGS)
    should(opts.output).eql(path.join(process.cwd(), 'website'))
  })
  describe('--albums-from', () => {
    it('can be specified once', () => {
      const args = BASE_ARGS.concat(['--albums-from', '%path'])
      const opts = options.get(args)
      should(opts.albumsFrom).eql(['%path'])
    })
    it('can be specified multiple times', () => {
      const args = BASE_ARGS.concat([
        '--albums-from', '%path',
        '--albums-from', '%keywords'
      ])
      const opts = options.get(args)
      should(opts.albumsFrom).eql(['%path', '%keywords'])
    })
  })
  describe('deprecated', () => {
    it('--original-photos false', () => {
      const args = BASE_ARGS.concat(['--original-photos false'])
      const opts = options.get(args)
      should(opts.downloadPhotos).eql('large')
    })
    it('--original-photos true', () => {
      const args = BASE_ARGS.concat(['--original-photos'])
      const opts = options.get(args)
      should(opts.downloadPhotos).eql('copy')
    })
    it('--original-videos false', () => {
      const args = BASE_ARGS.concat(['--original-videos false'])
      const opts = options.get(args)
      should(opts.downloadVideos).eql('large')
    })
    it('--original-videos true', () => {
      const args = BASE_ARGS.concat(['--original-videos'])
      const opts = options.get(args)
      should(opts.downloadVideos).eql('copy')
    })
    it('--albums-from folders', () => {
      const args = BASE_ARGS.concat(['--albums-from', 'folders'])
      const opts = options.get(args)
      should(opts.albumsFrom).eql(['%path'])
    })
    it('--albums-from folders (when several patterns)', () => {
      const args = BASE_ARGS.concat([
        '--albums-from', 'folders',
        '--albums-from', '%keywords'
      ])
      const opts = options.get(args)
      should(opts.albumsFrom).eql(['%path', '%keywords'])
    })
    it('--albums-from date', () => {
      const args = BASE_ARGS.concat([
        '--albums-from', 'date',
        '--albums-date-format', 'YYYY MMM'
      ])
      const opts = options.get(args)
      should(opts.albumsFrom).eql(['{YYYY MMM}'])
    })
  })
})
