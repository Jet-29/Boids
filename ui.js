// sliders
let sliderMaxSpeed;
let sliderMinSpeed;
let sliderBoundaryForce;
let sliderBoundaryDistanceFromWall;
let sliderCoherenceForce;
let sliderCoherenceInfluenceDistance;
let sliderSeparationForce;
let sliderSeparationInfluenceDistance;
let sliderAlignmentForce;
let sliderAlignmentInfluenceDistance;


function setupUI() {
    // speed
    sliderMaxSpeed = createSlider(0, 30, 10, 0.000001);
    sliderMaxSpeed.position(1460, 820);
    sliderMaxSpeed.style('width', '300px');

    sliderMinSpeed = createSlider(0, 30, 1, 0.000001);
    sliderMinSpeed.position(1460, 900);
    sliderMinSpeed.style('width', '300px');

    // boundary
    sliderBoundaryForce = createSlider(0, 10, 0.5, 0.000001);
    sliderBoundaryForce.position(1120, 820);
    sliderBoundaryForce.style('width', '300px');

    sliderBoundaryDistanceFromWall = createSlider(0, 500, 200, 0.000001);
    sliderBoundaryDistanceFromWall.position(1120, 900);
    sliderBoundaryDistanceFromWall.style('width', '300px');

    // coherence
    sliderCoherenceForce = createSlider(0, 0.01,0.005, 0.000001);
    sliderCoherenceForce.position(780, 820);
    sliderCoherenceForce.style('width', '300px');

    sliderCoherenceInfluenceDistance = createSlider(0, 500,75, 0.000001);
    sliderCoherenceInfluenceDistance.position(780, 900);
    sliderCoherenceInfluenceDistance.style('width', '300px');

    // separation
    sliderSeparationForce = createSlider(0, 0.1, 0.05, 0.000001);
    sliderSeparationForce.position(440, 820);
    sliderSeparationForce.style('width', '300px');

    sliderSeparationInfluenceDistance = createSlider(0, 50,20, 0.000001);
    sliderSeparationInfluenceDistance.position(440, 900);
    sliderSeparationInfluenceDistance.style('width', '300px');

    // alignment
    sliderAlignmentForce = createSlider(0, 0.1, 0.05, 0.000001);
    sliderAlignmentForce.position(100, 820);
    sliderAlignmentForce.style('width', '300px');

    sliderAlignmentInfluenceDistance = createSlider(0, 500, 75, 0.000001);
    sliderAlignmentInfluenceDistance.position(100, 900);
    sliderAlignmentInfluenceDistance.style('width', '300px');
}

function updateValues() {
    textSize(20);

    // speed
    text('Max speed:    ' + sliderMaxSpeed.value(), 1460, 820);
    text('Min speed:    ' + sliderMinSpeed.value(), 1460, 900);

    // boundary
    text('Boundary force:    ' + sliderBoundaryForce.value(), 1120, 820);
    text('Boundary distance:    ' + sliderBoundaryDistanceFromWall.value(), 1120, 900);

    // coherence
    text('Coherence force:    ' + sliderCoherenceForce.value(), 780, 820);
    text('Coherence distance:    ' + sliderCoherenceInfluenceDistance.value(), 780, 900);

    // separation
    text('Separation force:    ' + sliderSeparationForce.value(), 440, 820);
    text('Separation distance:    ' + sliderSeparationInfluenceDistance.value(), 440, 900);

    // alignment
    text('Alignment force:    ' + sliderAlignmentForce.value(), 100, 820);
    text('Alignment distance:    ' + sliderAlignmentInfluenceDistance.value(), 100, 900);

    return [sliderMaxSpeed.value(), sliderMinSpeed.value(), sliderBoundaryForce.value(), sliderBoundaryDistanceFromWall.value(), sliderCoherenceForce.value(), sliderCoherenceInfluenceDistance.value(), sliderSeparationForce.value(), sliderSeparationInfluenceDistance.value(), sliderAlignmentForce.value(), sliderAlignmentInfluenceDistance.value()];
}