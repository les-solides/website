import DomParser from "../DomParser";

describe("DomParser.js", () => {
	it("returns DomImages from a dom string", () => {
		const path1 = "http://localhost/fake/path/1";
		const path2 = "http://localhost/fake/path/2";
		const images = DomParser.fetchAllImages(`
			<div>
				<img src='${ path1 }' alt='test-1' />
				<span>disturbance!</span>
				<img src='${ path2 }' alt="test-2" />
			</div>
		`);
		expect(images.length).toBe(2);
		expect(images[0].src).toBe(path1);
		expect(images[1].src).toBe(path2);
	});
});