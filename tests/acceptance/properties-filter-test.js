var broccoli = require('broccoli');
var expect = require('chai').expect;
var PropertiesFilter = require('../../index.js');
var fs = require('fs');
var path = require('path');
var walk = require('walk-sync');

var fixtures = path.join(process.cwd(), 'tests/fixtures');
var expectations = path.join(process.cwd(), 'tests/expectations');

describe('properties-filter', function() {
    var builder;

    afterEach(function() {
        if (builder) {
            builder.cleanup();
        }
    });

    it('transpiles properties files to js', function () {
        var filter = PropertiesFilter('a/path', {});
        expect(filter.getDestFilePath('foo.properties')).to.equal('foo.js');
    });

    it('converts properties syntax to js module exporting JSON', function () {
        builder = new broccoli.Builder(new PropertiesFilter(fixtures));
        return builder.build().then(function () {
            var resultedFiles = walk(builder.outputPath);
            var expectedFiles = walk(expectations);
            expect(resultedFiles).to.deep.equal(expectedFiles);

            resultedFiles.filter(filesOnly).forEach(function (fileName) {
                var expectedFile = fs.readFileSync(path.join(builder.outputPath, fileName), 'utf8');
                var resultedFile = fs.readFileSync(path.join(expectations, fileName), 'utf8');
                expect(expectedFile).to.equal(resultedFile);
            });
        });
        /*return filterProperties('.').then(function(result) {
            expect(result.files).to.deep.equal([
                'my-properties-1.js',
                'my-properties-2.js'
            ]);

            result.files.forEach(function(file) {
                var expectedFile = fs.readFileSync(path.join(result.directory, file), 'utf8');
                var resultedFile = fs.readFileSync(path.join(expectations, file), 'utf8');
                expect(expectedFile).to.equal(resultedFile);
            });
        });*/
    })
});

function filesOnly(path) {
    return !path.endsWith('/');
}