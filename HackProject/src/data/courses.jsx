export const courses = [
    {
      "major": "Computer Science",
      "min_average": 78.9,
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["SCIE 113"]] },
            {
              "credits": 3,
              "options": [["Additional Communication Requirement"]]
            },
            { "credits": 4, "options": [["CPSC 110"], ["CPSC 103", "CPSC 107"]] },
            { "credits": 4, "options": [["CPSC 121"]] },
            {
              "credits": 3,
              "options": [
                ["MATH 100"],
                ["MATH 102"],
                ["MATH 104"],
                ["MATH 180"],
                ["MATH 184"],
                ["MATH 120"],
                ["MATH 110"]
              ]
            },
            {
              "credits": 3,
              "options": [["MATH 101"], ["MATH 103"], ["MATH 105"], ["MATH 121"]]
            },
            { "credits": 10, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Second Year",
          "required_courses": [
            { "credits": 4, "options": [["CPSC 210"]] },
            { "credits": 4, "options": [["CPSC 213", "CPSC 221"]] },
            { "credits": 3, "options": [["MATH 200", "MATH 221"]] },
            { "credits": 3, "options": [["STAT 241"], ["STAT 251"]] },
            { "credits": 9, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            { "credits": 3, "options": [["CPSC 310", "CPSC 313", "CPSC 320"]] },
            {
              "credits": 9,
              "options": [["CPSC courses numbered 300 or higher"]]
            },
            {
              "credits": 9,
              "options": [["CPSC courses numbered 400 or higher"]]
            },
            { "credits": 32, "options": [["Electives"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Data Science",
      "min_average": 76.0,
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["CPSC 103"]] },
            { "credits": 3, "options": [["DSCI 100"]] },
            {
              "credits": 3,
              "options": [["MATH 100"],
              ["MATH 102"],
              ["MATH 104"],
              ["MATH 180"],
              ["MATH 184"],
              ["MATH 120"],
              ["MATH 110"]]
            },
            { "credits": 3, "options": [["MATH 101"], ["MATH 103"], ["MATH 105"], ["MATH 121"]] },
            { "credits": 3, "options": [["SCIE 113"]] },
            {
              "credits": 3,
              "options": [["Additional Communication Requirement"]]
            },
            { "credits": 12, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Second Year",
          "required_courses": [
            { "credits": 3, "options": [["DSCI 200", "DSCI 220", "DSCI 221"]] },
            { "credits": 3, "options": [["MATH 200", "MATH 221"]] },
            { "credits": 3, "options": [["STAT 201"]] },
            { "credits": 10, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            { "credits": 3, "options": [["CPSC 330"], ["CPSC 340"]] },
            { "credits": 3, "options": [["CPSC 368"]] },
            { "credits": 3, "options": [["DSCI 310", "DSCI 320", "DSCI 430"]] },
            {
              "credits": 3,
              "options": [["STAT 301", "STAT 302", "STAT 305", "STAT 443"]]
            },
            {
              "credits": 12,
              "options": [["Any Upper level MATH, STAT, CPSC, or DSCI"]]
            },
            { "credits": 6, "options": [["Data Science Depth Requirement"]] },
            { "credits": 15, "options": [["Electives"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Physics",
      "min_average": "NA",
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["SCIE 113"]] },
            {
              "credits": 3,
              "options": [["Additional Communication Requirement"]]
            },
            { "credits": 4, "options": [["CHEM 121"], ["CHEM 111"]] },
            {
              "credits": 3,
              "options": [
                ["MATH 100"],
                ["MATH 102"],
                ["MATH 104"],
                ["MATH 110"],
                ["MATH 120"],
                ["MATH 180"],
                ["MATH 184"]
              ]
            },
            {
              "credits": 3,
              "options": [["MATH 101"], ["MATH 103"], ["MATH 105"], ["MATH 121"]]
            },
            {
              "credits": 3,
              "options": [["PHYS 117"], ["PHYS 106"], ["PHYS 107"]]
            },
            { "credits": 3, "options": [["PHYS 118"], ["PHYS 108"]] },
            { "credits": 1, "options": [["PHYS 119"], ["PHYS 109"]] },
            { "credits": 7, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Second Year",
          "required_courses": [
            { "credits": 3, "options": [["MATH 200"]] },
            { "credits": 3, "options": [["MATH 215", "MATH 221"]] },
            { "credits": 3, "options": [["PHYS 200", "PHYS 216"]] },
            { "credits": 3, "options": [["PHYS 219", "PHYS 229"]] },
            { "credits": 3, "options": [["PHYS 210"]] },
            { "credits": 8, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            { "credits": 3, "options": [["MATH 317"]] },
            { "credits": 4, "options": [["PHYS 203"]] },
            { "credits": 3, "options": [["PHYS 309"], ["PHYS 319"]] },
            { "credits": 3, "options": [["PHYS 312"], ["MATH 316"]] },
            { "credits": 3, "options": [["PHYS 304"]] },
            { "credits": 3, "options": [["PHYS/ASTR 300-level and above"]] },
            { "credits": 26, "options": [["Electives"]] },
            { "credits": 3, "options": [["PHYS 301"]] },
            {
              "credits": 3,
              "options": [["PHYS 348"], ["PHYS 409"], ["PHYS 420"]]
            },
            { "credits": 9, "options": [["PHYS/ASTR 300-level and above"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Astronomy",
      "min_average": "NA",
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["SCIE 113"]] },
            {
              "credits": 3,
              "options": [["Additional Communication Requirement"]]
            },
            { "credits": 4, "options": [["CHEM 121"], ["CHEM 111"]] },
            {
              "credits": 3,
              "options": [
                ["MATH 100"],
                ["MATH 102"],
                ["MATH 104"],
                ["MATH 110"],
                ["MATH 120"],
                ["MATH 180"],
                ["MATH 184"]
              ]
            },
            {
              "credits": 3,
              "options": [["MATH 101"], ["MATH 103"], ["MATH 105"], ["MATH 121"]]
            },
            {
              "credits": 3,
              "options": [["PHYS 117"], ["PHYS 106"], ["PHYS 107"]]
            },
            { "credits": 3, "options": [["PHYS 118"], ["PHYS 108"]] },
            { "credits": 1, "options": [["PHYS 119"], ["PHYS 109"]] },
            { "credits": 7, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Second Year",
          "required_courses": [
            { "credits": 3, "options": [["ASTR 200", "ASTR 205"]] },
            { "credits": 3, "options": [["MATH 200", "MATH 317"]] },
            {
              "credits": 2,
              "options": [["MATH 221"], ["MATH 223"], ["MATH 215"]]
            },
            { "credits": 2, "options": [["PHYS 200", "PHYS 219", "PHYS 229"]] },
            { "credits": 3, "options": [["PHYS 210"]] },
            { "credits": 2, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            { "credits": 3, "options": [["ASTR 300"]] },
            { "credits": 3, "options": [["MATH 316"], ["PHYS 312"]] },
            { "credits": 4, "options": [["PHYS 203"]] },
            { "credits": 3, "options": [["PHYS 301", "PHYS 216"]] },
            { "credits": 4, "options": [["PHYS 408"]] },
            { "credits": 25, "options": [["Electives"]] },
            { "credits": 3, "options": [["ASTR 406"], ["ASTR 407"]] },
            { "credits": 3, "options": [["ASTR 404", "ASTR 405"]] },
            { "credits": 3, "options": [["PHYS 304", "PHYS 403"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Atmospheric Science",
      "min_average": "NA",
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["SCIE 113"]] },
            { "credits": 3, "options": [["DSCI 100"]] },
            {
              "credits": 8,
              "options": [["CHEM 121"], ["CHEM 111"], ["CHEM 141"], ["CHEM 123"]]
            },
            {
              "credits": 3,
              "options": [["MATH 100"], ["MATH 102"], ["MATH 104"]]
            },
            {
              "credits": 3,
              "options": [["MATH 101"], ["MATH 103"], ["MATH 105"]]
            },
            {
              "credits": 3,
              "options": [
                ["PHYS 117"],
                ["PHYS 101"],
                ["PHYS 106"],
                ["PHYS 107"],
                ["PHYS 131"]
              ]
            },
            { "credits": 3, "options": [["PHYS 118"], ["PHYS 108"]] },
            { "credits": 1, "options": [["PHYS 119"], ["PHYS 109"]] },
            { "credits": 3, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Second Year",
          "required_courses": [
            {
              "credits": 3,
              "options": [["Additional Communication Requirement"]]
            },
            {
              "credits": 3,
              "options": [["ATSC 201"], ["GEOS 200"], ["GEOB 200"]]
            },
            {
              "credits": 3,
              "options": [["EOSC 211"], ["CPSC 103"], ["CPSC 110"]]
            },
            { "credits": 3, "options": [["MATH 200"]] },
            {
              "credits": 3,
              "options": [["STAT 201"], ["STAT 200"], ["STAT 251"]]
            },
            { "credits": 15, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            {
              "credits": 3,
              "options": [
                ["ATSC 301", "GEOS 300"],
                ["ATSC 301", "GEOB 300"]
              ]
            },
            { "credits": 3, "options": [["ENVR 300"]] },
            {
              "credits": 3,
              "options": [
                ["ATSC 303", "ATSC 413", "ATSC 409"],
                ["GEOS 309", "GEOS 370", "GEOS 373"],
                ["EOSC 352", "EOSC 354", "EOSC 410"]
              ]
            },
            {
              "credits": 3,
              "options": [["EOSC 340"], ["ENVR 410"], ["GEOG 312"]]
            },
            {
              "credits": 3,
              "options": [
                ["ATSC 313", "ATSC 405", "CHEM 302"],
                ["GEOS 400", "GEOS 401", "GEOS 402"],
                ["EOSC 440", "EOSC 471"],
                ["MECH 411"]
              ]
            },
            {
              "credits": 3,
              "options": [["ATSC 448"], ["GEOS 448"], ["GEOB 448"]]
            },
            { "credits": 24, "options": [["Electives"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Biochemistry",
      "min_average": 76.7,
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["SCIE 113"]] },
            {
              "credits": 3,
              "options": [["Additional Communication Requirement"]]
            },
            { "credits": 3, "options": [["BIOL 112"]] },
            {
              "credits": 4,
              "options": [["CHEM 121"], ["CHEM 111"], ["CHEM 141"]]
            },
            { "credits": 4, "options": [["CHEM 123"]] },
            {
              "credits": 3,
              "options": [["MATH 100"], ["MATH 102"], ["MATH 104"]]
            },
            { "credits": 3, "options": [["DSCI 100"], ["CPSC 103"]] },
            { "credits": 3, "options": [["PHYS 100-level"]] },
            { "credits": 4, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Second Year",
          "required_courses": [
            { "credits": 3, "options": [["BIOC 203"]] },
            { "credits": 3, "options": [["BIOL 200"]] },
            { "credits": 3, "options": [["BIOL 234"]] },
            { "credits": 3, "options": [["CHEM 205"]] },
            { "credits": 4, "options": [["CHEM 203"]] },
            { "credits": 2, "options": [["CHEM 213", "CHEM 245"]] },
            { "credits": 3, "options": [["STAT 201"], ["CPSC 203"]] },
            { "credits": 7, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            { "credits": 3, "options": [["BIOC 301"]] },
            { "credits": 6, "options": [["BIOC 303"]] },
            { "credits": 3, "options": [["BIOC 306"]] },
            { "credits": 3, "options": [["BIOL 335"]] },
            { "credits": 3, "options": [["CHEM 313"]] },
            { "credits": 30, "options": [["Electives"]] },
            { "credits": 6, "options": [["BIOC 402", "BIOC 410"]] },
            {
              "credits": 3,
              "options": [
                ["BIOC 403"],
                ["BIOC 421"],
                ["BIOC 430"],
                ["BIOC 440"],
                ["BIOC 450"],
                ["BIOC 460"],
                ["BIOC 470"]
              ]
            },
            { "credits": 3, "options": [["BIOC Upper Year Elective"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Biology",
      "min_average": "NA",
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["SCIE 113"]] },
            { "credits": 3, "options": [["BIOL 112"]] },
            { "credits": 3, "options": [["BIOL 121"]] },
            { "credits": 2, "options": [["BIOL 180"], ["BIOL 140"]] },
            {
              "credits": 4,
              "options": [["CHEM 121"], ["CHEM 111"], ["CHEM 141"]]
            },
            { "credits": 4, "options": [["CHEM 123"]] },
            { "credits": 3, "options": [["CPSC 103"], ["DSCI 100"]] },
            {
              "credits": 3,
              "options": [
                ["MATH 100"],
                ["MATH 102"],
                ["MATH 104"],
                ["MATH 120"],
                ["MATH 180"],
                ["MATH 184"]
              ]
            },
            {
              "credits": 3,
              "options": [["MATH 101"], ["MATH 103"], ["MATH 105"], ["MATH 121"]]
            },
            { "credits": 3, "options": [["PHYS 131"]] }
          ],
          "total_credits": 31
        },
        {
          "year": "Second Year",
          "required_courses": [
            {
              "credits": 3,
              "options": [["Additional Communication Requirement"]]
            },
            { "credits": 3, "options": [["BIOL 200", "BIOL 230", "BIOL 260"]] },
            { "credits": 3, "options": [["BIOL 233"], ["BIOL 234"]] },
            {
              "credits": 4,
              "options": [
                ["BIOL 203", "BIOL 204"],
                ["BIOL 203", "BIOL 205"],
                ["BIOL 203", "BIOL 209"],
                ["BIOL 203", "BIOL 210"],
                ["MICB 201", "MICB 211"]
              ]
            },
            { "credits": 4, "options": [["CHEM 233", "CHEM 235"]] },
            { "credits": 3, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            { "credits": 3, "options": [["BIOL 300"]] },
            { "credits": 3, "options": [["BIOL 336"]] },
            { "credits": 4, "options": [["Biology Laboratory Selections"]] },
            { "credits": 20, "options": [["Life Science Selections"]] },
            { "credits": 29, "options": [["Electives"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Chemistry",
      "min_average": "NA",
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["SCIE 113"]] },
            {
              "credits": 4,
              "options": [["CHEM 121"], ["CHEM 111"], ["CHEM 141"]]
            },
            { "credits": 4, "options": [["CHEM 123"]] },
            {
              "credits": 3,
              "options": [["MATH 100"], ["MATH 102"], ["MATH 104"]]
            },
            {
              "credits": 3,
              "options": [["MATH 101"], ["MATH 103"], ["MATH 105"]]
            },
            { "credits": 6, "options": [["PHYS 100-level"]] },
            { "credits": 7, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Second Year",
          "required_courses": [
            { "credits": 4, "options": [["CHEM 203"]] },
            { "credits": 3, "options": [["CHEM 208"]] },
            { "credits": 4, "options": [["CHEM 211"]] },
            { "credits": 4, "options": [["CHEM 213", "CHEM 245"]] },
            { "credits": 3, "options": [["CHEM 218"]] },
            { "credits": 3, "options": [["MATH 200"]] },
            { "credits": 3, "options": [["MATH 221"], ["STAT 200"]] },
            { "credits": 6, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            { "credits": 3, "options": [["BIOL 201"], ["BIOC 202"]] },
            { "credits": 3, "options": [["CHEM 300"]] },
            { "credits": 3, "options": [["CHEM 304"]] },
            { "credits": 3, "options": [["CHEM 311"]] },
            { "credits": 3, "options": [["CHEM 312"]] },
            { "credits": 4, "options": [["CHEM 325", "CHEM 345"]] },
            {
              "credits": 6,
              "options": [
                ["CHEM 305", "CHEM 313"],
                ["CHEM 305", "CHEM 318"],
                ["CHEM 305", "CHEM 327"],
                ["CHEM 305", "CHEM 330"],
                ["CHEM 305", "CHEM 412"]
              ]
            },
            { "credits": 3, "options": [["CHEM 445"]] },
            { "credits": 12, "options": [["CHEM Electives"]] },
            { "credits": 20, "options": [["Electives"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Environmental Sciences",
      "min_average": "NA",
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["BIOL 121"]] },
            { "credits": 3, "options": [["ENVR 100"]] },
            {
              "credits": 4,
              "options": [["CHEM 121"], ["CHEM 111"], ["CHEM 141"]]
            },
            { "credits": 3, "options": [["SCIE 113"]] },
            { "credits": 3, "options": [["DSCI 100"]] },
            {
              "credits": 3,
              "options": [
                ["MATH 100"],
                ["MATH 102"],
                ["MATH 104"],
                ["MATH 180"],
                ["MATH 184"],
                ["MATH 120"]
              ]
            },
            {
              "credits": 3,
              "options": [["MATH 101"], ["MATH 103"], ["MATH 105"], ["MATH 121"]]
            },
            { "credits": 3, "options": [["PHYS 100-level"]] },
            { "credits": 5, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Second Year",
          "required_courses": [
            {
              "credits": 7,
              "options": [["ENVR 200"], ["ENVR 205"], ["ENVR 240"]]
            },
            { "credits": 3, "options": [["EOSC 340"]] },
            { "credits": 3, "options": [["Tools Elective"]] },
            { "credits": 6, "options": [["Area of Concentration"]] },
            { "credits": 3, "options": [["ENVR 200"]] },
            {
              "credits": 3,
              "options": [["STAT 200"], ["STAT 201"], ["BIOL 300"]]
            },
            { "credits": 8, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            {
              "credits": 16,
              "options": [
                ["ENVR 300", "ENVR 305", "ENVR 350", "ENVR 400", "ENVR 450"]
              ]
            },
            { "credits": 3, "options": [["EOSC 345"]] },
            { "credits": 9, "options": [["Complementary Studies"]] },
            { "credits": 17, "options": [["Electives"]] },
            { "credits": 17, "options": [["Area of Concentration"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Mathematics",
      "min_average": "NA",
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["SCIE 113"]] },
            {
              "credits": 3,
              "options": [["Additional Communication Requirement"]]
            },
            {
              "credits": 3,
              "options": [
                ["MATH 100"],
                ["MATH 102"],
                ["MATH 104"],
                ["MATH 120"],
                ["MATH 180"],
                ["MATH 184"]
              ]
            },
            {
              "credits": 3,
              "options": [["MATH 101"], ["MATH 103"], ["MATH 105"], ["MATH 121"]]
            },
            { "credits": 3, "options": [["PHYS 100-level"]] },
            { "credits": 4, "options": [["CPSC 110"], ["CPSC 103", "CPSC 107"]] },
            { "credits": 11, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Second Year",
          "required_courses": [
            { "credits": 3, "options": [["MATH 200"], ["MATH 226"]] },
            { "credits": 3, "options": [["MATH 220"]] },
            {
              "credits": 2,
              "options": [["MATH 221"], ["MATH 223"], ["MATH 215"]]
            },
            { "credits": 3, "options": [["CPSC 210"], ["MATH 210"]] },
            { "credits": 15, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            {
              "credits": 24,
              "options": [["MATH courses numbered 300 or higher"]]
            },
            {
              "credits": 6,
              "options": [["MATH, STAT, or CPSC courses numbered 300 or higher"]]
            },
            { "credits": 30, "options": [["Electives"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Cellular, Anatomical and Physiological Sciences",
      "min_average": 83.7,
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["SCIE 113"]] },
            {
              "credits": 3,
              "options": [["Additional Communication Requirement"]]
            },
            { "credits": 3, "options": [["BIOL 112"]] },
            { "credits": 3, "options": [["BIOL 121"]] },
            {
              "credits": 4,
              "options": [["CHEM 121"], ["CHEM 141"], ["CHEM 111"]]
            },
            { "credits": 4, "options": [["CHEM 123"]] },
            { "credits": 3, "options": [["MATH 100"]] },
            { "credits": 3, "options": [["MATH 101"]] },
            { "credits": 3, "options": [["PHYS 100-level beyond PHYS 100"]] }
          ],
          "total_credits": 29
        },
        {
          "year": "Second Year",
          "required_courses": [
            { "credits": 3, "options": [["BIOL 200"]] },
            { "credits": 3, "options": [["BIOL 234"]] },
            { "credits": 3, "options": [["BIOL 201"], ["BIOC 202"]] },
            { "credits": 3, "options": [["BIOL 300"], ["STAT 200"]] },
            { "credits": 3, "options": [["CAPS 205"]] },
            { "credits": 3, "options": [["CAPS 206"]] },
            { "credits": 4, "options": [["CHEM 233", "CHEM 235"], ["CHEM 203"]] },
            { "credits": 3, "options": [["CHEM 205"]] },
            { "credits": 6, "options": [["Electives"]] }
          ],
          "total_credits": 31
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            { "credits": 3, "options": [["BIOC 302"]] },
            { "credits": 3, "options": [["CAPS 303"]] },
            { "credits": 3, "options": [["CAPS 305"]] },
            { "credits": 3, "options": [["CAPS 306"]] },
            { "credits": 3, "options": [["CAPS 310"]] },
            { "credits": 3, "options": [["CAPS 391"]] },
            {
              "credits": 9,
              "options": [
                ["CAPS 420"],
                ["CAPS 421"],
                ["CAPS 422"],
                ["CAPS 424"],
                ["CAPS 426"],
                ["CAPS 427"],
                ["CAPS 431"],
                ["CAPS 448"]
              ]
            },
            { "credits": 33, "options": [["Electives"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Earth and Ocean Sciences",
      "min_average": "NA",
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["SCIE 113"]] },
            {
              "credits": 4,
              "options": [["CHEM 121"], ["CHEM 111"], ["CHEM 141"]]
            },
            { "credits": 4, "options": [["CHEM 123"]] },
            { "credits": 3, "options": [["EOSC 100-level"], ["ATSC 100-level"]] },
            { "credits": 1, "options": [["EOSC 111"]] },
            {
              "credits": 3,
              "options": [["MATH 100"], ["MATH 102"], ["MATH 104"]]
            },
            {
              "credits": 3,
              "options": [["MATH 101"], ["MATH 103"], ["MATH 105"]]
            },
            { "credits": 3, "options": [["PHYS 100-level"]] },
            { "credits": 3, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Second Year",
          "required_courses": [
            {
              "credits": 3,
              "options": [["Additional Communication Requirement"]]
            },
            {
              "credits": 3,
              "options": [["EOSC 211"], ["GEOS 270"], ["GEOB 270"]]
            },
            { "credits": 3, "options": [["EOSC 212"]] },
            {
              "credits": 6,
              "options": [
                ["EOSC 200-level or above"],
                ["ENVR 200-level or above"],
                ["ATSC 200-level or above"]
              ]
            },
            { "credits": 15, "options": [["Electives"]] }
          ],
          "total_credits": 30
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            {
              "credits": 24,
              "options": [
                ["EOSC 300-level or above"],
                ["ENVR 300-level or above"],
                ["ATSC 300-level or above"]
              ]
            },
            {
              "credits": 6,
              "options": [
                ["EOSC 400-level"],
                ["ENVR 400-level"],
                ["ATSC 400-level"]
              ]
            },
            { "credits": 30, "options": [["Electives"]] }
          ]
        }
      ],
      "total_credits_for_degree": 120
    },
    {
      "major": "Biochemistry and Forensic Science",
      "min_average": 76.7,
      "years": [
        {
          "year": "First Year",
          "required_courses": [
            { "credits": 3, "options": [["SCIE 113"]] },
            {
              "credits": 3,
              "options": [["Additional Communication Requirement"]]
            },
            { "credits": 3, "options": [["BIOL 112"]] },
            {
              "credits": 4,
              "options": [["CHEM 121"], ["CHEM 111"], ["CHEM 141"]]
            },
            { "credits": 4, "options": [["CHEM 123"]] },
            {
              "credits": 3,
              "options": [["MATH 100"], ["MATH 102"], ["MATH 104"]]
            },
            { "credits": 3, "options": [["DSCI 100"], ["CPSC 103"]] },
            { "credits": 3, "options": [["PHYS 100-level"]] },
            { "credits": 8, "options": [["Electives"]] }
          ],
          "total_credits": 34
        },
        {
          "year": "Second Year",
          "required_courses": [
            {
              "credits": 24,
              "options": [
                ["BIOC 203"],
                ["BIOL 200"],
                ["BIOL 234"],
                ["CHEM 203"],
                ["CHEM 213", "CHEM 245"],
                ["CHEM 211"],
                ["STAT 201"],
                ["CPSC 203"]
              ]
            },
            { "credits": 3, "options": [["FSCT 280", "FSCT 290"]] }
          ],
          "total_credits": 33
        },
        {
          "year": "Upper Year Courses",
          "required_courses": [
            {
              "credits": 15,
              "options": [["BIOC 303"], ["BIOC 301"], ["BIOL 335"], ["Electives"]]
            },
            { "credits": 9, "options": [["FSCT 380", "FSCT 390"]] },
            {
              "credits": 10,
              "options": [
                ["BIOC 402", "BIOC 410"],
                ["BIOC 403"],
                ["BIOC 421"],
                ["BIOC 430"],
                ["BIOC 440"],
                ["BIOC 450"],
                ["BIOC 460"],
                ["BIOC 470"],
                ["BIOC research option"],
                ["FSCT Upper Year Elective"],
                ["Electives"]
              ]
            },
            { "credits": 5, "options": [["FSCT 480", "FSCT 490"]] }
          ]
        }
      ],
      "total_credits_for_degree": 132
    }
  ]