const dataLevel = {
    'Hub': {
        'Name': 'Hub',
        'Size': [20, 20],
        'Wall': [
            [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10],
            [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [1, 10], [2, 10], [3, 10], [4, 10], [5, 10],
            [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10],
            [2, 8], [2, 9], [4, 8], [4, 9]
        ],
        'Floor': [
            {'Type': 'Connection', 'Position': [2, 2], 'Connected': 'Tutorial1'},
            {'Type': 'Connection', 'Position': [2, 4], 'Connected': 'Tutorial2'},
            {'Type': 'Connection', 'Position': [2, 6], 'Connected': 'Tutorial3'},
            {'Type': 'Connection', 'Position': [4, 2], 'Connected': 'Tutorial4'},
            {'Type': 'Connection', 'Position': [4, 4], 'Connected': 'Tutorial5'},
            {'Type': 'Connection', 'Position': [4, 6], 'Connected': 'Tutorial6'},
            {'Type': 'LevelGate', 'Position': [3, 8], 'Solid': true, 'Opened': false, 'Condition': ['Tutorial1', 'Tutorial2', 'Tutorial3', 'Tutorial4', 'Tutorial5', 'Tutorial6']}
        ],
        'Thing': [

        ],
        'Groups': [],
        'Start': [1, 1],
        'Goal': [3, 9]
    },

    'Tutorial1': {
        'Name': 'Tutorial1',
        'Size': [8, 8],
        'Wall': [
            [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
            [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
            [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
            [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7],
            [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5]
        ],
        'Floor': [

        ],
        'Thing': [

        ],
        'Groups': {},
        'Start': [1, 1],
        'Goal': [6, 6]
    },

    'Tutorial2': {
        'Name': 'Tutorial2',
        'Size': [8, 8],
        'Wall': [
            [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
            [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
            [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
            [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7],
            [2, 5], [2, 6], [4, 5], [4, 6]
        ],
        'Floor': [
            
        ],
        'Thing': [
            {'Type': 'Box', 'Position': [3, 4], 'Solid': true, 'Pushable': true}
        ],
        'Groups': [],
        'Start': [3, 1],
        'Goal': [3, 6],
    },

    'Tutorial3': {
        'Name': 'Tutorial3',
        'Size': [8, 8],
        'Wall': [
            [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
            [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
            [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
            [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7],
            [5, 5], [5, 6],
        ],
        'Floor': [
            {'Type': 'PressureButton', 'Position': [6, 2], 'Solid': false, 'Group': '1'},
            {'Type': 'Gate', 'Position': [6, 5], 'Solid': true, 'Opened': false, 'Condition': '1'}
        ],
        'Thing': [
            {'Type': 'Box', 'Position': [2, 4], 'Solid': true, 'Pushable': true},
        ],
        'Groups': ['1'],
        'Start': [3, 1],
        'Goal': [6, 6],
    },

    'Tutorial4': {
        'Name': 'Tutorial4',
        'Size': [8, 10],
        'Wall': [
            [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
            [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
            [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9],
            [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9],
            [1, 7], [2, 7], [3, 7]
        ],
        'Floor': [
            {'Type': 'Gate', 'Position': [2, 8], 'Solid': true, 'Opened': false, 'Condition': '1'},
            {'Type': 'Gate', 'Position': [3, 8], 'Solid': true, 'Opened': false, 'Condition': '2'},
            {'Type': 'PressureButton', 'Position': [1, 4], 'Solid': false, 'Group': '1'},
            {'Type': 'PressureButton', 'Position': [5, 2], 'Solid': false, 'Group': '1'},
            {'Type': 'PressureButton', 'Position': [6, 3], 'Solid': false, 'Group': '2'},
            {'Type': 'PressureButton', 'Position': [4, 4], 'Solid': false, 'Group': '2'},
        ],
        'Thing': [
            {'Type': 'Box', 'Position': [3, 2], 'Solid': true, 'Pushable': true},
            {'Type': 'Box', 'Position': [3, 3], 'Solid': true, 'Pushable': true},
            {'Type': 'Box', 'Position': [3, 4], 'Solid': true, 'Pushable': true},
            {'Type': 'Box', 'Position': [3, 5], 'Solid': true, 'Pushable': true},
        ],
        'Groups': ['1', '2'],
        'Start': [1, 1],
        'Goal': [1, 8],
    },

    'Tutorial5': {
        'Name': 'Tutorial5',
        'Size': [8, 8],
        'Wall': [
            [0, 0], [0, 1], [0, 2], [0, 4], [0, 5], [0, 6], [0, 7],
            [1, 0], [2, 0], [4, 0], [5, 0], [6, 0],
            [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
            [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7],
            [5, 5], [5, 6]
        ],
        'Floor': [
            {'Type': 'Gate', 'Position': [6, 5], 'Solid': true, 'Opened': false, 'Condition': '1'},
        ],
        'Thing': [
            {'Type': 'LaserEmitter', 'Position': [0, 3], 'Solid': true, 'Group': '1', 'Pushable': false, 'RayDirection': 'Down', 'Condition': ['Equal', 7]},
            {'Type': 'LaserEmitter', 'Position': [3, 0], 'Solid': true, 'Group': '1', 'Pushable': false, 'RayDirection': 'Right', 'Condition': ['Equal', 8]},
            {'Type': 'NumGlass', 'Position': [4, 2], 'Solid': true, 'Pushable': true, 'Number': 3},
            {'Type': 'NumGlass', 'Position': [4, 4], 'Solid': true, 'Pushable': true, 'Number': 4},
            {'Type': 'NumGlass', 'Position': [2, 4], 'Solid': true, 'Pushable': true, 'Number': 5},
        ],
        'Groups': ['1'],
        'Start': [1, 1],
        'Goal': [6, 6],
    },

    'Tutorial6': {
        'Name': 'Tutorial6',
        'Size': [8, 8],
        'Wall': [
            [0, 0], [0, 1], [0, 2], [0, 4], [0, 5], [0, 6], [0, 7],
            [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0],
            [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
            [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7],
            [5, 4], [5, 5], [5, 6]
        ],
        'Floor': [
            {'Type': 'Gate', 'Position': [6, 4], 'Solid': true, 'Opened': false, 'Condition': '1'},
            {'Type': 'Gate', 'Position': [6, 5], 'Solid': true, 'Opened': false, 'Condition': '2'},
            {'Type': 'PressureButton', 'Position': [3, 3], 'Solid': false, 'Group': '2'},
        ],
        'Thing': [
            {'Type': 'LaserEmitter', 'Position': [0, 3], 'Solid': true, 'Group': '1', 'Pushable': false, 'RayDirection': 'Down', 'Condition': ['Equal', 5]},
            {'Type': 'NumGlass', 'Position': [2, 4], 'Solid': true, 'Pushable': true, 'Number': 5},
        ],
        'Groups': ['1', '2'],
        'Start': [1, 1],
        'Goal': [6, 6],
    }
}