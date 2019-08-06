export const builder = () => {
    const randomId = Math.random() * 10 + `Ycf${Math.random() * 10}` + `h${Math.random() * 10}o${Math.random() * 10}`; 
    return {
        "active": true,
        "dateFormat": "LLLL",
        "isPublic": false,
        "step": {
            "active": true,
            "dateFormat": "LLLL",
            "stepType": "Origin",
            "priority": 1,
            "xpos": 75,
            "ypos": 56,
            "origin": true,
            "isPublic": false,
            "allowEntitlements": true,
            "sla": {
                "enabled": false,
                "duration": 0
            },
            "id": randomId,
            "created": 1564684945767,
            "updated": 1565069882824,
            "name": "Add New Contact",
            "chain": false,
            "end": false
        },
        "origin": {
            "active": true,
            "dateFormat": "LLLL",
            "stepType": "Origin",
            "priority": 1,
            "xpos": 75,
            "ypos": 56,
            "origin": true,
            "isPublic": false,
            "allowEntitlements": true,
            "sla": {
                "enabled": false,
                "duration": 0
            },
            "id": randomId,
            "created": 1564684945767,
            "updated": 1565069882824,
            "name": "Add New Contact",
            "chain": false,
            "end": false
        }
    }};